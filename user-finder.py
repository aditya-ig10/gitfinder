import requests

def find_users_by_location(location):
    base_url = 'https://api.github.com/search/users'
    params = {'q': f'location:{location}'}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        users = response.json().get('items', [])
        return users
    else:
        print(f'Error: {response.status_code}')
        return None

def main():
    location_to_search = input('Enter the location to search for GitHub users: ')

    users = find_users_by_location(location_to_search)

    if users:
        print(f'Users in {location_to_search}:')
        for user in users:
            print(f'{user["login"]}: {user["html_url"]}')
    else:
        print('Failed to retrieve users.')

if __name__ == "__main__":
    main()
