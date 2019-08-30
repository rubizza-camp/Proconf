module WebhooksHelper
  def webhook_create_url(users_trello_token)
    "https://api.trello.com/1/tokens/#{users_trello_token}/webhooks"
  end
end
