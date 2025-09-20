print("Testing basic imports step by step...")

try:
    print("1. Testing pandas import...")
    import pandas as pd
    print("   ✅ pandas imported successfully")
except Exception as e:
    print(f"   ❌ pandas import failed: {e}")

try:
    print("2. Testing sklearn imports...")
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.model_selection import train_test_split
    print("   ✅ sklearn imports successful")
except Exception as e:
    print(f"   ❌ sklearn import failed: {e}")

try:
    print("3. Testing models package...")
    import models
    print("   ✅ models package imported")
except Exception as e:
    print(f"   ❌ models package import failed: {e}")

try:
    print("4. Testing pss10_questions...")
    from models.pss10_questions import PSS10_QUESTIONS
    print(f"   ✅ PSS10_QUESTIONS imported ({len(PSS10_QUESTIONS)} questions)")
except Exception as e:
    print(f"   ❌ PSS10_QUESTIONS import failed: {e}")

try:
    print("5. Testing stress_model module import...")
    import models.stress_model
    print("   ✅ stress_model module imported")
except Exception as e:
    print(f"   ❌ stress_model module import failed: {e}")
    import traceback
    traceback.print_exc()

try:
    print("6. Testing StressAnalyzer class import...")
    from models.stress_model import StressAnalyzer
    print("   ✅ StressAnalyzer class imported")
except Exception as e:
    print(f"   ❌ StressAnalyzer class import failed: {e}")
    import traceback
    traceback.print_exc()

try:
    print("7. Testing StressAnalyzer instantiation...")
    from models.stress_model import StressAnalyzer
    analyzer = StressAnalyzer()
    print("   ✅ StressAnalyzer instance created successfully")
except Exception as e:
    print(f"   ❌ StressAnalyzer instantiation failed: {e}")
    import traceback
    traceback.print_exc()

print("\nDone! If all tests passed, your setup should work.")