from pathlib import Path
from src.utils.date_helper import get_date_constants
from src.utils.parameter_helper import convert_to_params

# Base directory for templates is relative to this script's location
TEMPLATE_DIR = Path(__file__).parent.parent / "templates"
TEMPLATE_FILES = {
    "append": TEMPLATE_DIR / "append.gs",
    "paste": TEMPLATE_DIR / "paste.gs"
}

def load_template(mode):
    """Load the template file based on the mode with UTF-8 encoding."""
    try:
        template_file = TEMPLATE_FILES[mode]
    except KeyError:
        raise ValueError(f"Invalid mode '{mode}'. Valid modes are: {list(TEMPLATE_FILES.keys())}")
    
    if not template_file.exists():
        raise FileNotFoundError(f"Template file not found: {template_file}")
    
    return template_file.read_text(encoding="utf-8")


def generate_script(payload):
    """Generate the script by substituting placeholders in the template."""
    mode = payload["mode"]
    script = load_template(mode)
    
    for key, value in payload.items():
        if key == "_functionName":
            script = script.replace("_functionName", str(value))
        else:
            placeholder = f"{{{{{key}}}}}"  # e.g., {{username}}
            script = script.replace(placeholder, str(value))
    
    return script


def final_script(payload):
    """
    Combine template body, date constants, and parameter block into one final script.
    """
    script_body = generate_script(payload)

    date_constants = get_date_constants(payload)

    params_block = convert_to_params(payload)

    final_script_output = "\n\n".join([
        date_constants.strip(),
        params_block.strip(),
        script_body.strip()
    ])

    return final_script_output



def main():
    """Main function to execute the script generation."""
    input_data = {
        "mode": "paste",
        "METABASE_URL": "https://metabase.curefit.co",
        "USER_NAME": "linto.ns@yahoo.com",
        "PASSWORD": "sfsf",
        "EMAIL_ID": "linto.ns@yahoo.com",
        "_functionName": "_func",
        "card_ID": "3556",
        "num_Columns": 3,
        "SHEET_NAME": "sf",
        "TAB_NAME": "tb",
        "parameters": [
            {
            "id": "e4b8334b-9f1d-4465-971b-c7da21727d9c",
            "type": "text",
            "name": "df",
            "value": "df"
            },
            {
            "id": "9fb6a4f0-c86a-4040-b117-a4140f5033e9",
            "type": "date",
            "name": "df",
            "value": "D-2"
            }
        ]
        }
    try:
        generated_script = final_script(input_data)
        print(generated_script)
    except (ValueError, FileNotFoundError) as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()