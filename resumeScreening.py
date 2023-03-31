import numpy as np
import pandas as pd
import PyPDF2
import pdfplumber
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def MatchResume(CV, Req):
    CV_File=open(CV,'rb')
    Script=PyPDF2.PdfReader(CV_File)
    pages=len(Script.pages)

    Script = []
    with pdfplumber.open(CV_File) as pdf:
        for i in range (0,pages):
            page=pdf.pages[i]
            text=page.extract_text()
            Script.append(text)

    Script=''.join(Script)
    CV_Clear=Script.replace("\n","")
    CV_Clear

    Req_File=open(Req,'rb')
    Script_Req=PyPDF2.PdfReader(Req_File)
    pages=len(Script_Req.pages)

    Script_Req = []
    with pdfplumber.open(Req_File) as pdf:
        for i in range (0,pages):
            page=pdf.pages[i]
            text=page.extract_text()
            Script_Req.append(text)

    Script_Req=''.join(Script_Req)
    Req_Clear=Script_Req.replace("\n","")
    Req_Clear

    Match_Test=[CV_Clear,Req_Clear]
    cv=CountVectorizer()
    count_matrix=cv.fit_transform(Match_Test)
    MatchPercentage=cosine_similarity(count_matrix)[0][1]*100
    MatchPercentage=round(MatchPercentage,2)

    return MatchPercentage

CV="src\Components\CVs\Hetvi_CV.pdf"
Req="src\Components\JobDescriptions\PythonDeveloperJD.pdf"
MatchScore = MatchResume(CV, Req)
print('Match Percentage is :'+ str(MatchScore)+'% to Requirement')