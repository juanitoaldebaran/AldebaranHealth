from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from models.stress_model import StressAnalyzer
from models.pss10_questions import calculate_pss10_score, get_questionnaire_data
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

CORS(app, origins=["*"])

stress_analyzer = StressAnalyzer()

@app.route("/api/health", methods=["GET"])
def health_check():
    try:
        return jsonify({
            "status": "healthy",
            "service": "AldebaranHealth Stress Analyzer",
            "version": "1.0.0",
            "model_trained": stress_analyzer.is_trained,
            "endpoints": {
                "questions": "/api/questions",
                "analyze": "/api/analyze",
                "health": "/api/health",
                "quick-score": "/api/quick-score",
                "train-model": "/api/train-model"
            }, 
        }), 200
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

@app.route("/api/questions", methods=["GET"])
def get_questions():
    try:
        logger.info("Serving PSS-10 questionnaire questions")
        questionnaire_data = get_questionnaire_data()

        return jsonify({
            "success": True,
            "data": questionnaire_data,
            "meta": {
                "total_questions": len(questionnaire_data["questions"]),
                "scale_type": "PSS-10",
                "response_range": "0-4"
            }
        }), 200
    except Exception as e:
        logger.error(f"Error serving questions: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to retrieve questionnaire",
            "details": str(e)
        }), 500

@app.route("/api/analyze", methods=["POST"])
def analyze_stress():
    try:
        if not request.is_json:
            return jsonify({
                "success": False,
                "error": "Content-Type must be application/json"
            }), 400

        data = request.get_json()

        if 'responses' not in data:
            return jsonify({
                "success": False,
                "error": "Missing 'responses' field in request body"
            }), 400

        responses = data["responses"]
        user_info = data.get("user_info", {})

        if not isinstance(responses, list):
            return jsonify({
                "success": False,
                "error": "Responses must be a list"
            }), 400
        
        if len(responses) != 10:
            return jsonify({
                "success": False,
                "error": f"PSS-10 requires exactly 10 responses, got {len(responses)}"
            }), 400

        for i, response in enumerate(responses):
            if not isinstance(response, (int, float)) or not (0 <= response <= 4):
                return jsonify({
                    "success": False,
                    "error": f"Response {i+1} must be a number between 0 and 4, got {response}"
                }), 400
            
        responses = [int(r) for r in responses]

        logger.info(f"Analyzing stress for responses: {responses}")

        analysis_results = stress_analyzer.predict_stress(responses)

        if user_info:
            analysis_results["user_info"] = user_info
        
        logger.info(f"Stress analysis completed. Level: {analysis_results['ml_prediction']['predicted_level']}")

        return jsonify({
            "success": True,
            "data": analysis_results,
            "meta": {
                "analysis_timestamp": analysis_results["timestamp"],
                "model_version": "1.0.0",
                "analysis_type": "PSS-10 + ML Enhanced"
            }
        }), 200
    
    except ValueError as ve:
        logger.error(f"Validation error in stress analysis: {str(ve)}")
        return jsonify({
            "success": False,
            "error": "Invalid input data",
            "details": str(ve)
        }), 400
        
    except Exception as e:
        logger.error(f"Error in stress analysis: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to analyze stress levels",
            "details": str(e)
        }), 500

@app.route("/api/train-model", methods=["POST"])
def retrain_model():
    try:
        logger.info("Starting model retraining...")

        accuracy = stress_analyzer.train_model()

        return jsonify({
            "success": True,
            "message": "Model retrained successfully",
            "accuracy": accuracy,
            "timestamp": stress_analyzer.model.fit.__dict__ if hasattr(stress_analyzer.model, 'fit') else None
        }), 200
    
    except Exception as e:
        logger.error(f"Error retraining model: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to retrain model",
            "details": str(e)
        }), 500
    
@app.route("/api/quick-score", methods=["POST"])
def quick_pss10_score():
    try:
        data = request.get_json()

        if not data or 'responses' not in data:
            return jsonify({
                "success": False,
                "error": "Missing 'responses' field",
            }), 400
        
        responses = data["responses"]
        if len(responses) != 10:
            return jsonify({
                "success": False,
                "error": "PSS-10 requires exactly 10 responses"
            }), 400

        responses = [int(r) for r in responses]
        pss10_results = calculate_pss10_score(responses)
        
        return jsonify({
            "success": True,
            "data": pss10_results
        }), 200

    except Exception as e:
        logger.error(f"Error calculating PSS-10 score: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to calculate score",
            "details": str(e)
        }), 500
    
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        "success": False,
        "error": "Endpoint not found",
        "available_endpoints": [
            "/api/health",
            "/api/questions", 
            "/api/analyze",
            "/api/quick-score",
            "/api/train-model"
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        "success": False,
        "error": "Internal server error",
        "message": "Please try again later"
    }), 500

if __name__ == '__main__':
    if not stress_analyzer.is_trained:
        logger.info("🤖 Training initial model...")
        try:
            stress_analyzer.train_model()
            logger.info("✅ Initial model training completed")
        except Exception as e:
            logger.error(f"❌ Failed to train initial model: {e}")
            logger.info("🔄 Model will be trained on first prediction request")
    
    host = os.getenv('FLASK_HOST', '127.0.0.1')
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"🚀 Starting AldebaranHealth Stress Analysis API")
    logger.info(f"📍 Server: http://{host}:{port}")
    logger.info(f"🔧 Debug mode: {debug}")
    logger.info(f"🧠 Model trained: {stress_analyzer.is_trained}")
    
    app.run(
        host=host, 
        port=port, 
        debug=debug,
        threaded=True 
    )