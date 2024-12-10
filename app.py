from flask import Flask, request, jsonify, redirect, url_for, session
from flask_mysqldb import MySQL
import bcrypt
from dotenv import load_dotenv
import os

# 加载 .env 文件中的环境变量
load_dotenv()

app = Flask(__name__)

# 配置 app.config 参数
app.config['SECRET_KEY'] = os.getenv('rnfmabj114514@@Ab')  # 加载密钥
app.config['MYSQL_HOST'] = os.getenv('192.168.1.172')  # MySQL 主机
app.config['MYSQL_USER'] = os.getenv('carl')  # MySQL 用户
app.config['MYSQL_PASSWORD'] = os.getenv('114514@@Ab')  # MySQL 密码
app.config['MYSQL_DB'] = os.getenv('mydatabase')  # 数据库名称

# 初始化 MySQL
mysql = MySQL(app)


@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    cursor = mysql.connection.cursor()
    try:
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                       (username, email, hashed_password))
        mysql.connection.commit()
        session['username'] = username  # 注册成功后存储用户名到 session
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()


@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    cursor = mysql.connection.cursor()
    try:
        cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            session['username'] = username  # 登录成功后存储用户名到 session
            return redirect(url_for('user_home'))  # 重定向到用户主页
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    finally:
        cursor.close()


@app.route('/user_home')
def user_home():
    if 'username' in session:
        username = session['username']
        return f"Welcome, {username}! This is your personalized page."
    else:
        return redirect(url_for('login'))


@app.route('/')
def home():
    return "Welcome to the Flask app! Please register or login."


if __name__ == '__main__':
    app.run(debug=True)

# scp C:\Users\josep\PycharmProjects\pythonProject\ requirements.txt root@47.113.97.138:/home/deployment
# 埃蒙斯