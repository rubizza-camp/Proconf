class WebhookParser
  def initialize(data)
    @webhook_info = JSON.parse(data)['action']
  end

  def execute
    {
      card_title: @webhook_info['data']['card']['name'],
      action_type: @webhook_info['type'],
      action_date: @webhook_info['date']
    }
  end
end
