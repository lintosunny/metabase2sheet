from typing import Dict
from src.utils.date_helper import get_inline_date_expression

def convert_to_params(payload: Dict) -> str:
    """
    Converts payload['parameters'] into a compact JS-style PARAMS array string.
    Each param will appear with inline date expressions.
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

        param_type = param.get("type", "")
        param_name = param.get("name", "")
        
        if param_type == "date":
            # Get the inline date expression
            date_expr = get_inline_date_expression(value)
            params.append({
                "type": param_type,
                "name": param_name,
                "value": date_expr
            })
        else:
            # Quote for text or other types
            params.append({
                "type": param_type,
                "name": param_name,
                "value": f'"{value}"'
            })

    if not params:
        return "// no params for this query"

    # Format the PARAMS array
    formatted_params = []
    for p in params:
        if p["type"] == "date":
            # Multi-line format for date params
            formatted_params.append(
                f"  {{\n"
                f"    'type': '{p['type']}',\n"
                f"    'target': ['variable', ['template-tag', '{p['name']}'']],\n"
                f"    'value': {p['value']}\n"
                f"  }}"
            )
        else:
            # Single-line format for non-date params
            formatted_params.append(
                f"  {{'type':'{p['type']}','target':['variable',['template-tag','{p['name']}']],'value':{p['value']}}}"
            )

    return f"PARAMS = [\n{','.join(formatted_params)}\n];"



if __name__ == "__main__":
    payload1 = {
        "parameters": [
            {"type": "text", "name": "df", "value": ""},
        ]
    }

    payload2 = {
        "parameters": [
            {"type": "text", "name": "df", "value": "sf"},
            {"type": "date", "name": "start_date", "value": "D_MINUS_1"},
            {"type": "date", "name": "end_date", "value": "TODAY"},
        ]
    }

    print(convert_to_params(payload1))
    print("\n" + "="*50 + "\n")
    print(convert_to_params(payload2))