
from nickname_generator import generate



def get_random_data(id):
    data = {
        "id": id,
        "nickname": generate(),
        "description": "Dead by Daylight",
        "links": {
            "steam": "zortan3301",
            "discord": "zortan3301",
            "twitch": "zortan3301"
        },
        "skills": [
            {
                "title": "coordinator",
                "count": 3,
            },
            {
                "title": "leader",
                "count": 2,
            }
        ],
        "awards": [
            {
                "title": "Ez Game",
                "imgSrc": "https://www.ezride.be/wp-content/uploads/2017/11/cropped-Logo_EZRide_yellow_circle.png"
            }
        ]
    }