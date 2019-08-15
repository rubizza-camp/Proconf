class CreateWebhooksController < ApplicationController
  before_action :authenticate_user!

  def create_webhook
    url = "https://api.trello.com/1/tokens/#{user_creds['trello_ouath_token']}/webhooks"
    body = {
      key: ENV['PROCONF_APIKEY'],
      callbackURL: [ ENV['CALLBACK_URL'], '/webhooks/receive' ].join,
      idModel: ENV['IDMODEL']
    }
    HTTParty.post(url, body: body)
    redirect_to '/admin'
  end
end
