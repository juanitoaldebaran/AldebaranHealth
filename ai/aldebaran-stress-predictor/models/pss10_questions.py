PSS10_QUESTIONS = [
    {
        "id": 1,
        "question": "In the last month, how often have you been upset because of something that happened unexpectedly?",
        "reverse_scored": False,  # Higher score = more stress
        "category": "unpredictability"
    },
    {
        "id": 2,
        "question": "In the last month, how often have you felt that you were unable to control the important things in your life?",
        "reverse_scored": False,
        "category": "lack_of_control"
    },
    {
        "id": 3,
        "question": "In the last month, how often have you felt nervous and stressed?",
        "reverse_scored": False,
        "category": "nervousness"
    },
    {
        "id": 4,
        "question": "In the last month, how often have you felt confident about your ability to handle your personal problems?",
        "reverse_scored": True,  # Higher confidence = less stress, so reverse score
        "category": "confidence"
    },
    {
        "id": 5,
        "question": "In the last month, how often have you felt that things were going your way?",
        "reverse_scored": True,
        "category": "positive_perception"
    },
    {
        "id": 6,
        "question": "In the last month, how often have you found that you could not cope with all the things that you had to do?",
        "reverse_scored": False,
        "category": "overwhelming"
    },
    {
        "id": 7,
        "question": "In the last month, how often have you been able to control irritations in your life?",
        "reverse_scored": True,
        "category": "control_irritations"
    },
    {
        "id": 8,
        "question": "In the last month, how often have you felt that you were on top of things?",
        "reverse_scored": True,
        "category": "mastery"
    },
    {
        "id": 9,
        "question": "In the last month, how often have you been angered because of things that were outside of your control?",
        "reverse_scored": False,
        "category": "external_anger"
    },
    {
        "id": 10,
        "question": "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
        "reverse_scored": False,
        "category": "overwhelmed"
    }
]

# Response options for each question
RESPONSE_OPTIONS = [
    {"value": 0, "label": "Never"},
    {"value": 1, "label": "Almost Never"},
    {"value": 2, "label": "Sometimes"},
    {"value": 3, "label": "Fairly Often"},
    {"value": 4, "label": "Very Often"}
]

# Stress level interpretation thresholds
STRESS_LEVELS = {
    "low": {"min": 0, "max": 13, "description": "Low perceived stress", "color": "green"},
    "moderate": {"min": 14, "max": 26, "description": "Moderate perceived stress", "color": "yellow"},
    "high": {"min": 27, "max": 40, "description": "High perceived stress", "color": "red"}
}

def calculate_pss10_score(responses):
    """
    Calculate PSS-10 total score from user responses
    
    Args:
        responses (list): List of response values (0-4) corresponding to each question
        
    Returns:
        dict: Contains total score, stress level, and breakdown
    """
    if len(responses) != 10:
        raise ValueError("PSS-10 requires exactly 10 responses")
    
    total_score = 0
    
    # Calculate score with reverse scoring for specific questions
    for i, response in enumerate(responses):
        question = PSS10_QUESTIONS[i]
        
        # Validate response range
        if not (0 <= response <= 4):
            raise ValueError(f"Response {i+1} must be between 0 and 4")
        
        # Apply reverse scoring if needed
        if question["reverse_scored"]:
            # Reverse score: 0→4, 1→3, 2→2, 3→1, 4→0
            adjusted_score = 4 - response
        else:
            adjusted_score = response
            
        total_score += adjusted_score
    
    # Determine stress level
    stress_level = "low"
    for level, threshold in STRESS_LEVELS.items():
        if threshold["min"] <= total_score <= threshold["max"]:
            stress_level = level
            break
    
    return {
        "total_score": total_score,
        "stress_level": stress_level,
        "stress_description": STRESS_LEVELS[stress_level]["description"],
        "color": STRESS_LEVELS[stress_level]["color"],
        "max_possible_score": 40,
        "percentage": round((total_score / 40) * 100, 1)
    }

def get_questionnaire_data():
    """
    Get complete questionnaire data for frontend
    
    Returns:
        dict: Complete questionnaire structure with questions and options
    """
    return {
        "questions": PSS10_QUESTIONS,
        "response_options": RESPONSE_OPTIONS,
        "instructions": "For each question, choose the response that best describes how you have felt in the last month.",
        "scale_description": "Rate each item from 0 (Never) to 4 (Very Often)"
    }