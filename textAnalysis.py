import speech_recognition as sr 
import os 
from pydub import AudioSegment
from pydub.silence import split_on_silence
import moviepy.editor as me
import shutil
import bs4 as bs
import sounddevice as sd
from scipy.io.wavfile import write
import wavio as wv

r = sr.Recognizer()
def get_large_audio_transcription(path):
    sound = AudioSegment.from_wav(path)  
    chunks = split_on_silence(sound,
        min_silence_len = 500,
        silence_thresh = sound.dBFS-14,
        keep_silence=500,
    )
    folder_name = "Audio_chunks"
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    whole_text = ""
    for i, audio_chunk in enumerate(chunks, start=1):
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            try:
                text = r.recognize_google(audio_listened)
            except sr.UnknownValueError as e:
                print("Error:", str(e))
            else:
                text = f"{text.capitalize()}. "
                print(chunk_filename, ":", text)
                whole_text += text
    with open('readme.txt', 'w') as f:
        f.write(whole_text)
    try:
        shutil.rmtree(folder_name)
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))
    return whole_text

# To Convert video to audio
captured_video = "Recorded_video_path"
captured_audio = "converted.wav"
video_clip = me.VideoFileClip(r"{}".format(captured_video))
video_clip.audio.write_audiofile(r"{}".format(captured_audio))
preprocesstext = get_large_audio_transcription(captured_audio)

myfile = open("readme.txt", "rt")
preprocesstext = myfile.read() 
myfile.close()   
