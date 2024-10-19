from openai import OpenAI
import datetime

# prompt = input("Enter prompt: ")



def get_response(prompt):
  # Get the current date and time
  now = datetime.datetime.now()
  # Format the date and time as a string
  date_time_str = now.strftime("%Y-%m-%d %A")
  # print(date_time_str)

  f = open("llmreq/system", "r")
  system = f.read()
  f.close()
  system = f"{system} Today's date and day : {date_time_str}"
  # print(system)


  ## Set the API key
  f = open("llmreq/api", "r")
  key = f.read()
  f.close()

  key = key.split()
  key = key[0]

  MODEL="gpt-4o"
  client = OpenAI(api_key=key)


  completion = client.chat.completions.create(
    model=MODEL,
    messages=[
      {"role": "system", "content": system},
      {"role": "user", "content": prompt},
    ]
  )
  return(completion.choices[0].message.content)  

if __name__ == '__main__':
    print(get_response(input("Enter prompt: ")))