import pytest
from src.utils.parameter_helper import convert_to_params


def test_no_parameters():
    payload = {"parameters": []}
    result = convert_to_params(payload)
    assert result.strip() == "// no params for this query"


def test_all_empty_values():
    payload = {"parameters": [
        {"type": "text", "name": "df", "value": ""},
        {"type": "text", "name": "x", "value": None}
    ]}
    result = convert_to_params(payload)
    assert result.strip() == "// no params for this query"


def test_single_text_param():
    payload = {"parameters": [
        {"type": "text", "name": "region", "value": "India"}
    ]}
    result = convert_to_params(payload)
    assert "PARAMS =" in result
    assert "'type':'text'" in result
    assert '"India"' in result  # quoted string


def test_single_date_param():
    payload = {"parameters": [
        {"type": "date", "name": "start_date", "value": "D_MINUS_7"}
    ]}
    result = convert_to_params(payload)
    assert "PARAMS =" in result
    assert "'type':'date'" in result
    assert '"D_MINUS_7"' not in result  # date should not be quoted
    assert "D_MINUS_7" in result


def test_mixed_parameters():
    payload = {"parameters": [
        {"type": "text", "name": "df", "value": "sales"},
        {"type": "date", "name": "start_date", "value": "D_MINUS_31"},
    ]}
    result = convert_to_params(payload)
    assert "PARAMS =" in result
    assert "'type':'text'" in result
    assert "'type':'date'" in result
    assert '"sales"' in result
    assert "D_MINUS_31" in result


def test_ignore_empty_value_in_mixed():
    payload = {"parameters": [
        {"type": "text", "name": "df", "value": ""},
        {"type": "date", "name": "start_date", "value": "D_MINUS_31"},
    ]}
    result = convert_to_params(payload)
    assert "D_MINUS_31" in result
    assert '"df"' not in result  # skipped due to empty value