def get_inline_date_expression(date_key: str) -> str:
    """
    Returns the inline JavaScript date expression with .toISOString().split('T')[0]
    """
    DATE_EXPRESSIONS = {
        "TODAY": "new Date(new Date()\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_MINUS_1": "new Date(new Date(new Date().setDate(new Date().getDate() - 1))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_MINUS_7": "new Date(new Date(new Date().setDate(new Date().getDate() - 7))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_MINUS_14": "new Date(new Date(new Date().setDate(new Date().getDate() - 14))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_MINUS_31": "new Date(new Date(new Date().setDate(new Date().getDate() - 31))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_MINUS_365": "new Date(new Date(new Date().setDate(new Date().getDate() - 365))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_PLUS_7": "new Date(new Date(new Date().setDate(new Date().getDate() + 7))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_PLUS_14": "new Date(new Date(new Date().setDate(new Date().getDate() + 14))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_PLUS_31": "new Date(new Date(new Date().setDate(new Date().getDate() + 31))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "D_PLUS_365": "new Date(new Date(new Date().setDate(new Date().getDate() + 365))\n      .setUTCHours(0, 0, 0, 0))\n      .toISOString()\n      .split('T')[0]",
        "CURRENT_MONTH_START": "new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))\n      .toISOString()\n      .split('T')[0]",
        "CURRENT_MONTH_END": "new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0))\n      .toISOString()\n      .split('T')[0]",
        "LAST_MONTH_START": "new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 1, 1))\n      .toISOString()\n      .split('T')[0]",
        "LAST_MONTH_END": "new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 0))\n      .toISOString()\n      .split('T')[0]",
        "SECOND_LAST_MONTH_START": "new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 2, 1))\n      .toISOString()\n      .split('T')[0]",
        "SECOND_LAST_MONTH_END": "new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 1, 0))\n      .toISOString()\n      .split('T')[0]"
    }
    
    return DATE_EXPRESSIONS.get(date_key, f"'Unknown date key: {date_key}'")