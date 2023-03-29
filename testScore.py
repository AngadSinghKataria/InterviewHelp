from sentence_transformers import SentenceTransformer, util
import numpy as np
from transformers import pipeline

model = SentenceTransformer('stsb-roberta-large')
classifier = pipeline("text-classification",model='bhadresh-savani/distilbert-base-uncased-emotion', return_all_scores=True)

def calculate_score(s1, s2):
    embedding1 = model.encode(s1, convert_to_tensor=True)
    embedding2 = model.encode(s2, convert_to_tensor=True)
    cosine_scores = util.pytorch_cos_sim(embedding1, embedding2)
    return cosine_scores.item()*100

def sentiment_analysis(s1):
    prediction = classifier(s1)
    x = prediction[0]
    score = 0
    confidence = 1
    for i in x:
        print(i)
        if i['label'] == 'sadness':
            score -= i['score']
        elif i['label'] == 'joy':
            score += i['score']
        elif i['label'] == 'love':
            score += i['score']
        elif i['label'] == 'anger':
            score -= i['score']
        elif i['label'] == 'fear':
            score -= i['score']
            confidence -= i['score'] 
        elif i['label'] == 'surprise':
            confidence -= i['score'] 
            score -= i['score']

    return (score*100, confidence*100)


