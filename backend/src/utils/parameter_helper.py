from typing import Dict

def convert_to_params(payload: Dict) -> str:
    """
    Converts payload['parameters'] into a compact JS-style PARAMS array string.
    Each param will appear on one line.
    """
    parameters = payload.get("parameters", [])

    if not parameters or all(
        not p.get("value") or str(p.get("value")).strip() == "" for p in parameters
    ):
        return "// no params for this query"

    params = []
    for param in parameters:
        value = param.get("value")
        if not value or str(value).strip() == "":
            continue
        params.append({
            "type": param.get("type", ""),
            "target": ["variable", ["template-tag", param.get("name", "")]],
            "value": value
        })

    if not params:
        return "// no params for this query"

    # Compact one-line formatting per param
    formatted = ",\n  ".join(
        [str(p).replace(" ", "") for p in params]
    )
    return f"PARAMS = [\n  {formatted}\n]"


# Example usage
if __name__ == "__main__":
    payload1 = {
        "parameters": [
            {"type": "text", "name": "df", "value": ""},
        ]
    }

    payload2 = {
        "parameters": [
            {"type": "text", "name": "df", "value": "sf"},
            {"type": "date", "name": "start_date", "value": "D-7"},
        ]
    }

    print(convert_to_params(payload1))
    print(convert_to_params(payload2))