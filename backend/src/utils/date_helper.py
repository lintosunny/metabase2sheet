from typing import Dict, List

DATE_CONSTANTS_JS = {
    "TODAY": 'const TODAY = new Date();',
    "D-1": 'const YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 1));',
    "D-7": 'const D_7 = new Date(new Date().setDate(new Date().getDate() - 7));',
    "D-14": 'const D_14 = new Date(new Date().setDate(new Date().getDate() - 14));',
    "D-31": 'const D_31 = new Date(new Date().setDate(new Date().getDate() - 31));',
    "D-365": 'const D_365 = new Date(new Date().setDate(new Date().getDate() - 365));',
    "D+7": 'const D_P7 = new Date(new Date().setDate(new Date().getDate() + 7));',
    "D+14": 'const D_P14 = new Date(new Date().setDate(new Date().getDate() + 14));',
    "D+31": 'const D_P31 = new Date(new Date().setDate(new Date().getDate() + 31));',
    "D+365": 'const D_P365 = new Date(new Date().setDate(new Date().getDate() + 365));',
    "CURRENT_MONTH_START": 'const CURRENT_MONTH_START = new Date(new Date().getFullYear(), new Date().getMonth(), 1);',
    "CURRENT_MONTH_END": 'const CURRENT_MONTH_END = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);',
    "LAST_MONTH_START": 'const LAST_MONTH_START = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);',
    "LAST_MONTH_END": 'const LAST_MONTH_END = new Date(new Date().getFullYear(), new Date().getMonth(), 0);',
    "SECOND_LAST_MONTH_START": 'const SECOND_LAST_MONTH_START = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);',
    "SECOND_LAST_MONTH_END": 'const SECOND_LAST_MONTH_END = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0);'
}

def get_date_constants(payload: Dict) -> str:
    """Generate JS constant declarations for all date-type parameters."""
    params = payload.get("parameters", [])

    if not params:
        return "// no date parameters"

    date_consts = []
    seen = set()

    for param in params:
        if param.get("type", "").lower() == "date":
            value = param.get("value")
            if value not in seen:
                js_const = DATE_CONSTANTS_JS.get(value)
                if js_const:
                    date_consts.append(js_const)
                else:
                    date_consts.append(f"// Unknown date key: {value}")
                seen.add(value)

    if not date_consts:
        return "// no date parameters"

    return "\n".join(date_consts)


if __name__ == "__main__":
    payload = {
        "metabaseUrl": "https://metabase.curefit.co",
        "username": "linto.ns@yahoo.com",
        "password": "sfsf",
        "emailId": "linto.ns@yahoo.com",
        "functionName": "_func",
        "questionId": "3556",
        "columnCount": 3,
        "sheetName": "sf",
        "tabName": "tb",
        "parameters": [
            {"id": "e4b8334b-9f1d-4465-971b-c7da21727d9c", "type": "text", "name": "df", "value": "df"},
            {"id": "9fb6a4f0-c86a-4040-b117-a4140f5033e9", "type": "date", "name": "df", "value": "D-1"}
        ]
    }

    output = get_date_constants(payload)
    print(output)