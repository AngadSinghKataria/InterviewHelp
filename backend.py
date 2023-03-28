from flask import Flask, request, jsonify
import sqlite3
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from resumeScreening import MatchResume
import json
import os
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT * FROM users')
        rows = c.fetchall()
        users = []
        for row in rows:
            user = {'id': row[0], 'name': row[1], 'email': row[2], 'accountType': row[3]}
            users.append(user)
        conn.close()
        return jsonify(users)
    elif request.method == 'POST':
        name = request.json['name']
        email = request.json['email']
        accountType = request.json['accountType']
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute('INSERT INTO users (name, email, accountType) VALUES (?, ?)', (name, email, accountType))
        conn.commit()
        user_id = c.lastrowid
        conn.close()
        return jsonify({'id': user_id, 'name': name, 'email': email})

@app.route('/users/<int:user_id>', methods=['GET', 'PUT'])
def user(user_id):
    if request.method == 'GET':
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT * FROM users WHERE id = ?', (user_id,))
        row = c.fetchone()
        conn.close()
        if row is None:
            return jsonify({'error': 'User not found'}), 404
        user = {'id': row[0], 'name': row[1], 'email': row[2]}
        return jsonify(user)
    elif request.method == 'PUT':
        name = request.json['name']
        email = request.json['email']
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', (name, email, user_id))
        conn.commit()
        conn.close()
        return jsonify({'id': user_id, 'name': name, 'email': email})
    


@app.route('/tests', methods=['POST'])
def create_test():
    name = request.json['name']
    questions = request.json['questions']
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT INTO tests (name) VALUES (?)', (name,))
    test_id = c.lastrowid
    for question in questions:
        question_id = c.lastrowid
        c.execute('INSERT INTO questions (test_id, question, question_id) VALUES (?, ?, ?)',
                  (test_id, question['question'], question_id))
        for option in question['options']:
            c.execute('INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
                      (question_id, option['option_text'], option['is_correct']))
    conn.commit()
    conn.close()
    return jsonify({'id': test_id, 'name': name, 'questions': questions})

@app.route('/tests/<int:test_id>/questions', methods=['GET'])
def get_questions(test_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT test_id, question, question_id FROM questions WHERE test_id = ?', (test_id,))
    rows = c.fetchall()
    questions = []
    for row in rows:
        question_id = row[2]
        question = row[1]
        questions.append({'id': question_id, 'question': question})
    conn.close()
    return jsonify(questions)

@app.route('/tests/<int:test_id>/submit', methods=['POST'])
def submittest(test_id):
    answers = request.json['answers']
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    for answer in answers:
        question_id = answer['question_id']
        option_id = answer['option_id']
        c.execute('INSERT INTO submissions (test_id, question_id, option_id) VALUES (?, ?, ?)',
                  (test_id, question_id, option_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Answers submitted successfully'})

@app.route('/tests/<int:test_id>/scores', methods=['POST'])
def store_score(test_id):
    user_id = request.json['user_id']
    score = request.json['score']
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT INTO scores (test_id, user_id, score) VALUES (?, ?, ?)',
              (test_id, user_id, score))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Score stored successfully'})


@app.route('/jobs', methods=['POST'])
def add_job():
    title = request.json['title']
    description = request.json['description']
    company = request.json['company']
    location = request.json['location']
    salary = request.json['salary']
    conn = sqlite3.connect('jobs.db')
    c = conn.cursor()
    c.execute('INSERT INTO jobs (title, description, company, location, salary) VALUES (?, ?, ?, ?, ?)',
              (title, description, company, location, salary))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Job added successfully'}), 201


@app.route('/jobs', methods=['GET'])
def list_jobs():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM jobs')
    jobs = []
    for row in c.fetchall():
        job = {
            'id': row[0],
            'title': row[1],
            'description': row[2],
            'company': row[3],
            'location': row[4],
            'salary': row[5]
        }
        jobs.append(job)
    conn.close()
    return jsonify(jobs)

@app.route('/jobs', methods=['POST'])
def add_job12():
    title = request.json['title']
    description = request.json['description']
    company = request.json['company']
    location = request.json['location']
    salary = request.json['salary']
    conn = sqlite3.connect('jobs.db')
    c = conn.cursor()
    c.execute('INSERT INTO jobs (title, description, company, location, salary) VALUES (?, ?, ?, ?, ?)',
              (title, description, company, location, salary))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Job added successfully'}), 201

@app.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    title = request.json['title']
    description = request.json['description']
    company = request.json['company']
    location = request.json['location']
    salary = request.json['salary']
    conn = sqlite3.connect('jobs.db')
    c = conn.cursor()
    c.execute('UPDATE jobs SET title=?, description=?, company=?, location=?, salary=? WHERE id=?',
              (title, description, company, location, salary, job_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Job updated successfully'})


@app.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('DELETE FROM jobs WHERE id=?', (job_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Job deleted successfully'})


################################################################################################################################################

def convertBinarytoFile(title, file):
    bytes_data = bytes(file)
    target_path = 'src/Components/DownloadedFiles/'
    with open(target_path+f'{title}.pdf', 'wb') as f:
        f.write(bytes_data)
    return target_path+f'{title}.pdf'

@app.route('/getjobs', methods=['GET'])
def get_jobs():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT id, title, jobdescriptionfile, companyname, location, salary FROM jobs')
    jobs = []
    for row in c.fetchall():
        job = {
            'id': row[0],
            'title': row[1],
            'description': convertBinarytoFile(row[1],row[2]),
            'company': row[3],
            'location': row[4],
            'salary': row[5],
        }
        jobs.append(job)
    conn.close()
    return json.dumps(jobs)

@app.route('/gettest', methods=['POST'])
def get_test():
    if request.method=="POST":
        data = request.get_json()
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('SELECT * FROM questions WHERE job_id='+str(data["jobId"]))
        jobs = []
        for row in c.fetchall():
            job = {
                'id': row[0],
                'job_id': row[1],
                'question': row[2],
                'answer': row[3],
            }
            jobs.append(job)
        conn.close()
        return jsonify(jobs)

@app.route('/submittest', methods=['POST'])
def submit_test():
    if request.method=="POST":
        try:
            data = request.get_json()
            questions = data["questions"]
            jobid = data["jobId"]
            conn = sqlite3.connect('database.db')
            c = conn.cursor()
            for i in questions:
                c.execute('INSERT INTO answers (question_id, answer_text, user_id) VALUES (?, ?, ?, ?)',
                        (i["questionId"], i["answer"], 0))
                conn.commit()
            conn.close()
            return jsonify({"data": "Inserted Successfully!"})
        except:
            return jsonify({"data": "Insertion Unsuccessful!"})


@app.route('/uploadfile', methods=['POST'])
def upload_file():
    target_folder = 'src/Components/CVs/'
    file = request.files['file']
    print(file)
    filename = secure_filename(file.filename)
    print(filename)
    target_file = os.path.join(target_folder, filename)
    file.save(target_file)
    return 'File uploaded successfully'
    

@app.route('/resumeScreening', methods=['POST'])
def resume_screening():
    jd_file_path = request.files['jd_file']
    resume_file_path = request.files['resume_file']
    match_score = MatchResume(resume_file_path, jd_file_path)
    return jsonify(match_score=match_score)


@app.route('/upload_jd', methods=['POST'])
def upload_jd():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    jobData = json.loads(request.form.get('jobdetails'))
    testData = json.loads(request.form.get('questions'))
    questions, answers = testData['questions'], testData['answers']

    jobtitle = jobData['jobtitle']
    companyname = jobData['company']
    location = jobData['location']
    salary = int(jobData['salary'])
    job_Description_file = request.files['file']
    job_description_data = job_Description_file.read()
    c.execute('INSERT INTO jobs (title, companyname, location, salary, jobdescriptionfile) VALUES (?, ?, ?, ?, ?)',
           (jobtitle, companyname, location, salary, job_description_data))
    conn.commit()
    c.execute("SELECT id FROM jobs where title='"+jobtitle+"'")
    id = c.fetchall()[0]
    for i in range(len(questions)):
        c.execute('INSERT INTO questions (job_id, question, answer) VALUES (?, ?, ?)',
           (id[0], questions[i], answers[i]))
        conn.commit()
    conn.close()
    return jsonify({'message': 'JD uploaded created successfully'})



if __name__ == '__main__':
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, accountType TEXT, resume BLOB NOT NULL)')
    c.execute('CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, job_id INTEGER, question TEXT, answer TEXT)')
    c.execute('CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, question_id INTEGER, answer_text TEXT, user_id INTEGER)')
    c.execute('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, job_id INTEGER NOT NULL, user_id INTEGER NOT NULL, score INTEGER NOT NULL)')
    # c.execute('CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, company TEXT NOT NULL, location TEXT NOT NULL, salary INTEGER NOT NULL)')
    c.execute('CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL,  companyname TEXT NOT NULL, location TEXT NOT NULL, salary INTEGER NOT NULL, jobdescriptionfile BLOB NOT NULL)')
    with open('src/Components/CVs/Angad_Singh_Kataria_CV.pdf', 'rb') as file:
        resume = file.read()
    c.execute('INSERT INTO users (name,email,accountType,resume) VALUES (?,?,?,?)',
           ('Abhinav', 'abhinav@gmail.com', 'student', resume))
    conn.commit()
    conn.close()
    app.run(debug=True)