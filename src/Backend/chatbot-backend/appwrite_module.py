from appwrite.client import Client
from appwrite.services.databases import Databases

class AppwriteDataFetcher:
    def __init__(self):
        # Store the API credentials inside the class itself
        self.endpoint = 'https://cloud.appwrite.io/v1'
        self.project_id = '66f5584300118c16edcd'
        self.api_key = 'standard_caef17d67d4b56307c9f72dc4277922fa6b74ffa3c78c7aab90941c62591f3299ea066029acc69aae270613f050068f21e6c6b769e30fcab4510a4257e0ec4b38d4e25520d3115599816974bd2eba7190dd25b2a1ca9190fa64e8c85c1f4953414db8f729b26bc71dfcf33f79c3d2eef417eebaf4fc5b50ae5e803e0e19691ae'
        self.database_id = "66f55927002fe5bde3ac"  # Default database ID
        self.collection_id = "66f55930002a8f7f4dcf"  # Default collection ID
        
        # Set up the client and database connection
        self.client = Client()
        self.client.set_endpoint(self.endpoint)
        self.client.set_project(self.project_id)
        self.client.set_key(self.api_key)
        self.databases = Databases(self.client)

    def get_data(self, date_array, location_array, event_type):
        output_array = []
        print(date_array, location_array, event_type)
        # List documents from the database and collection
        doc = self.databases.list_documents(
            database_id=self.database_id,
            collection_id=self.collection_id
        )

        for data in doc['documents']:
            eventTitle = data['eventTitle']
            date = data['date']
            location = data['location']
            ticketType = data['ticketType']
            event_id = data['$id']

            # Print all event details
            # print(f"Title: {eventTitle}\nDate: {date}\nLocation: {location}\nTicket Type: {ticketType}\n")
            # url = f"https://crowdconnect.vercel.app/event/{event_id}"
            url = f"http://localhost:5173/event/{event_id}"
            print(url + "\n\n")

            if date in date_array:
                print(f"Date Matched - {eventTitle}")
                for k in location_array:
                    print("k is " + k)
                    if k.lower() in location.lower() or k == "none":
                        print(f"Location Matched - {eventTitle}")
                        if event_type == "none" or event_type == ticketType:
                            print(f"\n\nType Matched - {eventTitle}\n\n")
                            print(f"Title: {eventTitle}\nDate: {date}\nLocation: {location}\nTicket Type: {ticketType}\n")
                            output_array.append([[eventTitle], [url]])
                            break

        print("Output Array")
        print(output_array)
        return output_array

# If you want to run this module directly
if __name__ == "__main__":
    date_array = []  # Replace with your actual dates
    location_array = []  # Replace with your actual locations
    event_type = ""

    fetcher = AppwriteDataFetcher()
    fetcher.get_data(date_array, location_array, event_type)
