from flask import Flask, request, jsonify
from flask_cors import CORS
import llm
from appwrite_module import AppwriteDataFetcher


app = Flask(__name__)
CORS(app)

result = ""
@app.route('/chat', methods=['POST'])
def chat():
    global result
    result = ""
    user_message = request.json['message'].lower()

    response = llm.get_response(user_message)
    print(user_message)
    print(response)
    # response = f"category : {response[0]} \n date : {response[1]} \n location : {response[2]} \n type : {response[3]}"
    # print(response)

    if response.startswith("0"):
        response = response.split(" | ")
        d_array  = response[1]
        d_array = d_array.split(",")
        l_array = response[2]
        l_array = l_array.split(",")
        event_type = response[3]

        fetcher = AppwriteDataFetcher()
        output = fetcher.get_data(d_array, l_array, event_type)

        if output == []:
            result = "No Events found!"
        else:
            for i in output:
                a = str(i[0])
                b = str(i[1])
                result = (f"{result}\n{str(a)}\n{str(b)}\n\n")
                result = result.replace("['", "")
                result = result.replace("']", "")
                print(result)
    else:
        result = response
        result = result.replace("1 | '", "")
        

    return jsonify({'response': result})




if __name__ == '__main__':
    app.run(debug=True)