"""
Machine Learning Model for Stress Analysis

This module handles:
1. Training ML models on PSS-10 data
2. Making predictions from user responses
3. Providing detailed stress analysis with recommendations
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
from .pss10_questions import calculate_pss10_score, PSS10_QUESTIONS

class StressAnalyzer:
    def __init__(self, model_path="trained_models/stress_classifier.pkl"):
        """
        Initialize the stress analyzer
        
        Args:
            model_path (str): Path to save/load the trained model
        """
        self.model_path = model_path
        self.model = None
        self.scaler = StandardScaler()
        self.is_trained = False
        
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        
        # Try to load existing model
        self.load_model()
    
    def generate_synthetic_data(self, n_samples=1000):
        """
        Generate synthetic PSS-10 response data for training
        
        This creates realistic patterns:
        - Low stress: More 0-1 responses, especially on reverse-scored items
        - High stress: More 3-4 responses on stress items, low on confidence items
        
        Args:
            n_samples (int): Number of synthetic samples to generate
            
        Returns:
            pd.DataFrame: Synthetic PSS-10 response data with labels
        """
        np.random.seed(42)  # For reproducible results
        data = []
        
        for _ in range(n_samples):
            # Randomly choose a stress level tendency
            stress_tendency = np.random.choice(['low', 'moderate', 'high'], 
                                             p=[0.3, 0.5, 0.2])  # More moderate cases
            
            responses = []
            
            for question in PSS10_QUESTIONS:
                if stress_tendency == 'low':
                    # Low stress: favor lower responses, higher on reverse-scored
                    if question['reverse_scored']:
                        # High confidence/control (reverse scored = less stress)
                        response = np.random.choice([2, 3, 4], p=[0.3, 0.4, 0.3])
                    else:
                        # Low negative feelings
                        response = np.random.choice([0, 1, 2], p=[0.4, 0.4, 0.2])
                        
                elif stress_tendency == 'moderate':
                    # Moderate stress: balanced responses
                    if question['reverse_scored']:
                        response = np.random.choice([1, 2, 3], p=[0.3, 0.4, 0.3])
                    else:
                        response = np.random.choice([1, 2, 3], p=[0.3, 0.4, 0.3])
                        
                else:  # high stress
                    # High stress: favor higher negative responses, lower positive
                    if question['reverse_scored']:
                        # Low confidence/control
                        response = np.random.choice([0, 1, 2], p=[0.3, 0.4, 0.3])
                    else:
                        # High negative feelings
                        response = np.random.choice([2, 3, 4], p=[0.3, 0.4, 0.3])
                
                responses.append(response)
            
            # Calculate actual PSS-10 score
            score_data = calculate_pss10_score(responses)
            
            # Create feature vector (responses + derived features)
            features = responses + [
                sum(responses),  # Total raw score
                score_data['total_score'],  # PSS-10 calculated score
                sum(1 for r in responses if r >= 3),  # Count high responses
                sum(1 for r in responses if r <= 1),  # Count low responses
            ]
            
            data.append(features + [score_data['stress_level']])
        
        # Create column names
        columns = [f'q{i+1}' for i in range(10)] + [
            'raw_total', 'pss10_score', 'high_responses', 'low_responses', 'stress_level'
        ]
        
        return pd.DataFrame(data, columns=columns)
    
    def train_model(self, data=None):
        """
        Train the stress classification model
        
        Args:
            data (pd.DataFrame, optional): Training data. If None, generates synthetic data
        """
        print("🤖 Starting model training...")
        
        # Generate or use provided data
        if data is None:
            print("📊 Generating synthetic training data...")
            data = self.generate_synthetic_data(1500)  # Larger dataset for better training
        
        # Prepare features and target
        feature_columns = [col for col in data.columns if col != 'stress_level']
        X = data[feature_columns]
        y = data['stress_level']
        
        print(f"📈 Training on {len(X)} samples with {len(feature_columns)} features")
        print(f"📊 Class distribution: {y.value_counts().to_dict()}")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train Random Forest model (good for this type of categorical prediction)
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            class_weight='balanced',  # Handle any class imbalance
            max_depth=10
        )
        
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate model
        y_pred = self.model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"✅ Model trained successfully!")
        print(f"🎯 Accuracy: {accuracy:.3f}")
        print(f"📊 Detailed results:\n{classification_report(y_test, y_pred)}")
        
        # Cross-validation for more robust evaluation
        cv_scores = cross_val_score(self.model, X_train_scaled, y_train, cv=5)
        print(f"🔄 Cross-validation accuracy: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")
        
        self.is_trained = True
        
        # Save model
        self.save_model()
        
        return accuracy
    
    def predict_stress(self, responses):
        """
        Predict stress level from PSS-10 responses
        
        Args:
            responses (list): List of 10 response values (0-4)
            
        Returns:
            dict: Comprehensive stress analysis
        """
        if not self.is_trained and self.model is None:
            print("⚠️  No trained model available. Training new model...")
            self.train_model()
        
        # Validate input
        if len(responses) != 10:
            raise ValueError("PSS-10 requires exactly 10 responses")
        
        if not all(0 <= r <= 4 for r in responses):
            raise ValueError("All responses must be between 0 and 4")
        
        # Calculate PSS-10 score
        pss10_data = calculate_pss10_score(responses)
        
        # Create feature vector (same as training)
        features = responses + [
            sum(responses),  # Total raw score
            pss10_data['total_score'],  # PSS-10 calculated score
            sum(1 for r in responses if r >= 3),  # Count high responses
            sum(1 for r in responses if r <= 1),  # Count low responses
        ]
        
        # Scale features and predict
        features_scaled = self.scaler.transform([features])
        
        # Get prediction and confidence
        prediction = self.model.predict(features_scaled)[0]
        prediction_proba = self.model.predict_proba(features_scaled)[0]
        
        # Map probabilities to stress levels
        classes = self.model.classes_
        probabilities = {classes[i]: float(prediction_proba[i]) for i in range(len(classes))}
        
        # Generate detailed analysis
        analysis = self.generate_detailed_analysis(responses, pss10_data, prediction, probabilities)
        
        return analysis
    
    def generate_detailed_analysis(self, responses, pss10_data, ml_prediction, probabilities):
        """
        Generate comprehensive stress analysis with insights and recommendations
        
        Args:
            responses (list): User responses
            pss10_data (dict): PSS-10 calculation results
            ml_prediction (str): ML model prediction
            probabilities (dict): Prediction probabilities
            
        Returns:
            dict: Detailed analysis report
        """
        high_stress_indicators = []
        positive_indicators = []
        
        for i, response in enumerate(responses):
            question = PSS10_QUESTIONS[i]
            
            if question['reverse_scored']:
                # For reverse-scored items, low responses indicate stress
                if response <= 1:
                    high_stress_indicators.append({
                        'question_id': question['id'],
                        'category': question['category'],
                        'concern': f"Low {question['category'].replace('_', ' ')}"
                    })
                elif response >= 3:
                    positive_indicators.append({
                        'question_id': question['id'],
                        'category': question['category'],
                        'strength': f"Good {question['category'].replace('_', ' ')}"
                    })
            else:
                # For normal items, high responses indicate stress
                if response >= 3:
                    high_stress_indicators.append({
                        'question_id': question['id'],
                        'category': question['category'],
                        'concern': f"High {question['category'].replace('_', ' ')}"
                    })
                elif response <= 1:
                    positive_indicators.append({
                        'question_id': question['id'],
                        'category': question['category'],
                        'strength': f"Low {question['category'].replace('_', ' ')}"
                    })
        
        # Generate recommendations based on stress level
        recommendations = self.generate_recommendations(ml_prediction, high_stress_indicators)
        
        return {
            "pss10_results": pss10_data,
            "ml_prediction": {
                "predicted_level": ml_prediction,
                "confidence": max(probabilities.values()),
                "probabilities": probabilities
            },
            "analysis": {
                "high_stress_indicators": high_stress_indicators,
                "positive_indicators": positive_indicators,
                "key_concerns": [item['concern'] for item in high_stress_indicators[:3]],
                "strengths": [item['strength'] for item in positive_indicators[:3]]
            },
            "recommendations": recommendations,
            "timestamp": pd.Timestamp.now().isoformat(),
            "risk_assessment": self.assess_risk_level(pss10_data['total_score'], high_stress_indicators)
        }
    
    def generate_recommendations(self, stress_level, indicators):
        """Generate personalized recommendations based on stress analysis"""
        base_recommendations = {
            "low": [
                "Continue maintaining your current stress management strategies",
                "Regular exercise and good sleep hygiene",
                "Consider mindfulness or meditation practices for prevention"
            ],
            "moderate": [
                "Practice stress management techniques like deep breathing",
                "Ensure adequate sleep (7-9 hours) and regular exercise",
                "Consider talking to friends, family, or a counselor",
                "Try to identify and address specific stress triggers"
            ],
            "high": [
                "Consider speaking with a healthcare professional",
                "Practice immediate stress relief techniques (breathing, grounding)",
                "Prioritize self-care and reduce non-essential commitments",
                "Seek support from friends, family, or mental health professionals"
            ]
        }
        
        recommendations = base_recommendations.get(stress_level, base_recommendations["moderate"]).copy()
        
        # Add specific recommendations based on indicators
        if any("control" in ind["category"] for ind in indicators):
            recommendations.append("Focus on building sense of control through planning and organization")
        
        if any("overwhelming" in ind["category"] for ind in indicators):
            recommendations.append("Break large tasks into smaller, manageable steps")
        
        return recommendations
    
    def assess_risk_level(self, pss10_score, indicators):
        """Assess overall risk level and urgency"""
        if pss10_score >= 30 or len(indicators) >= 7:
            return {
                "level": "high",
                "urgency": "Consider professional support soon",
                "color": "red"
            }
        elif pss10_score >= 20 or len(indicators) >= 4:
            return {
                "level": "moderate",
                "urgency": "Monitor and take action if worsening",
                "color": "yellow"
            }
        else:
            return {
                "level": "low",
                "urgency": "Continue current positive practices",
                "color": "green"
            }
    
    def save_model(self):
        """Save the trained model and scaler"""
        if self.model is not None:
            model_data = {
                'model': self.model,
                'scaler': self.scaler,
                'is_trained': self.is_trained
            }
            joblib.dump(model_data, self.model_path)
            print(f"💾 Model saved to {self.model_path}")
    
    def load_model(self):
        """Load a previously trained model"""
        try:
            if os.path.exists(self.model_path):
                model_data = joblib.load(self.model_path)
                self.model = model_data['model']
                self.scaler = model_data['scaler']
                self.is_trained = model_data.get('is_trained', True)
                print(f"✅ Model loaded from {self.model_path}")
                return True
        except Exception as e:
            print(f"⚠️  Could not load model: {e}")
        
        return False
    
    # Convenience function for quick predictions
    def analyze_stress(responses):
        """
        Quick function to analyze stress from PSS-10 responses
        
        Args:
            responses (list): List of 10 response values (0-4)
            
        Returns:
            dict: Stress analysis results
        """
        analyzer = StressAnalyzer()
        return analyzer.predict_stress(responses)