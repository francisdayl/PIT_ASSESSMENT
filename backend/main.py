import requests


def run_query(url, query, variables=None, headers=None):
    """
    Make a GraphQL query using the requests library.

    Args:
        url (str): The GraphQL endpoint
        query (str): The GraphQL query
        variables (dict, optional): Variables for the query
        headers (dict, optional): HTTP headers

    Returns:
        dict: The response JSON
    """
    # Default headers if none provided
    if headers is None:
        headers = {"Content-Type": "application/json"}

    # Prepare the request payload
    payload = {"query": query}
    if variables:
        payload["variables"] = variables

    # Make the request
    response = requests.post(url, json=payload, headers=headers)

    # Check for errors
    response.raise_for_status()

    return response.json()


# Example usage
if __name__ == "__main__":
    # GraphQL endpoint
    url = "https://swapi-graphql.netlify.app/graphql"

    # Your GraphQL query
    query = """
    query AllPlanets {
        allPlanets {
            totalCount
            planets {
                name
                population
                terrains
                climates
            }
        }
    }
    """

    # Variables for the query
    variables = {}

    # Optional: Authorization headers if needed
    headers = {
        "Content-Type": "application/json",
    }

    # Execute the query
    result = run_query(url, query, variables, headers)
    print(result)
