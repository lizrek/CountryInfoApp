const handleError = (res, error, message) => {
  if (error.response) {
    console.error(
      `External API error: ${error.response.status} - ${error.response.data}`
    );
    return res.status(error.response.status).json({
      message: message || 'Error from external API',
      statusCode: error.response.status,
      apiError: error.response.data,
    });
  } else if (error.request) {
    console.error('No response from external API:', error.request);
    return res.status(504).json({
      message: message || 'No response from external API (Gateway Timeout)',
    });
  } else if (error.code === 'ECONNABORTED') {
    console.error('External API request timeout:', error.message);
    return res.status(504).json({
      message: message || 'External API request timeout (Gateway Timeout)',
    });
  } else {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({
      message: message || 'Unexpected error',
      error: error.message,
    });
  }
};

module.exports = {
  handleError,
};
