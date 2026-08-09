class CloudBackend:
    def __init__(self, config: dict):
        self.api_key = config.get("cloud_api_key", "")
        self.provider = config.get("cloud_provider", "")

    def categorize(self, extracted: dict) -> dict:
        # TODO: call gateway or provider API with extracted content
        raise NotImplementedError
