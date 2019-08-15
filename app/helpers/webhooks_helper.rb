module WebhooksHelper
  def parse_webhook
    webhook_info = JSON.parse(request.body.read)['action']
    @action_title = webhook_info['data']['card']['name']
    @action_type = webhook_info['type']
    @action_date = webhook_info['date']
  end
end
