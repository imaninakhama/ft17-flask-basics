from flask import Flask, request, jsonify, make_response
from customer import Customer
import structlog
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# configure logging
log = structlog.get_logger()

# endpoints
# customers
"""
/customers -> [GET] - [get all customers]
/customers -> [POST] - [add a customer]

/customers/<int:id> [GET] - [get one customer] 
/customers/<int:id> [PUT] - [update one customer] 
/customers/<int:id> [DELETE] - [delete one customer]
"""

customer_list = [
    Customer(1, "Jack", "Sparrow", "jack@email.com", "0712345678"),
    Customer(2, "Michael", "Scofield", "michael@email.com", "0712345678"),
    Customer(3, "Lincoln", "Burrows", "lincoln@email.com", "0712345678"),
    Customer(4, "Sara", "Tancredi", "sara@email.com", "0712345678"),
]


@app.before_request
def log_request():
    log.info(
        "request",
        method=request.method,
        content_type=request.headers.get("Content-Type"),
        user_agent=request.headers.get("User-Agent"),
    )


@app.route("/customers", methods=["GET", "POST"])
def customers():
    if request.method == "POST":
        data = request.get_json()
        # data = request.form
        log.info("add_customer_request", request_data=data)

        # retrieve the data from the request
        customer_id = max((customer.id for customer in customer_list), default=0) + 1
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")
        phone = data.get("phone")

        customer = Customer(
            id=customer_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
        )

        customer_list.append(customer)

        return jsonify(customer.to_dict()), 201

    all_customers = [customer.to_dict() for customer in customer_list]

    log.info("get_all_customers", customers=all_customers)

    return jsonify(all_customers), 200


# dynamic url
@app.route("/customers/<int:id>", methods=["GET"])
def get_customer(id):
    pass


@app.route("/customers/<int:id>", methods=["PATCH"])
def update_customer(id):
    pass


@app.route("/customers/<int:id>", methods=["DELETE"])
def delete_customer(id):
    pass


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        response = make_response({"email": email, "password": password}, 200)
        response.set_cookie("logged_in", "true")
        response.set_cookie("theme", "dark")
        response.set_cookie("username", "mongare")

        return response


@app.route("/login-without-data", methods=["POST"])
def login_without_data():
    if request.method == "POST":
        response = make_response(
            {"email": "admin@gmail.com", "password": "123456789"}, 200
        )
        response.set_cookie("logged_in", "true")
        response.set_cookie("theme", "dark")
        response.set_cookie("username", "mongare")

        return response


@app.route("/cookies", methods=["GET"])
def get_cookies():
    username = request.cookies.get("username")
    login_status = request.cookies.get("logged_in")
    theme = request.cookies.get("theme")

    return {"username": username, "login_status": login_status, "theme": theme}
