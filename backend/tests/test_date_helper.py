import pytest
from src.utils.date_helper import get_date_constants, DATE_CONSTANTS_JS


def test_no_parameters():
    payload = {"parameters": []}
    assert get_date_constants(payload) == "// no date parameters"


def test_no_date_type_parameters():
    payload = {"parameters": [{"type": "text", "value": "HELLO"}]}
    assert get_date_constants(payload) == "// no date parameters"


def test_valid_date_parameter():
    payload = {
        "parameters": [
            {"type": "date", "value": "D_MINUS_7"}
        ]
    }
    result = get_date_constants(payload)
    assert DATE_CONSTANTS_JS["D_MINUS_7"] in result
    assert "Unknown" not in result


def test_duplicate_date_parameters():
    payload = {
        "parameters": [
            {"type": "date", "value": "D_MINUS_7"},
            {"type": "date", "value": "D_MINUS_7"},
        ]
    }
    result = get_date_constants(payload)
    # Should only appear once even if duplicated
    assert result.count("D_MINUS_7") == 1


def test_unknown_date_key():
    payload = {
        "parameters": [
            {"type": "date", "value": "UNKNOWN_DATE_CONST"}
        ]
    }
    result = get_date_constants(payload)
    assert "// Unknown date key: UNKNOWN_DATE_CONST" in result