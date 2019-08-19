class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[complete receive]

  ADD_LABEL_TYPE = 'addLabelToCard'.freeze

  def complete
    head :ok
  end

  def receive
    webhook_data = WebhookParser.new(request.body.read).execute

    if webhook_data[:action_type] == ADD_LABEL_TYPE
      Episode.find_by(status: 'online').timecodes.create(
        title: webhook_data[:card_title],
        time: webhook_data[:action_date]
      )
    end

    head :ok
  end

  def create
    url = "https://api.trello.com/1/tokens/#{users_trello_token}/webhooks"
    body = {
      key: ENV['PROCONF_APIKEY'],
      callbackURL: [ENV['CALLBACK_URL'], '/webhooks/receive'].join,
      idModel: ENV['IDMODEL']
    }

    HTTParty.post(url, body: body)

    redirect_to admin_path
  end

  private

  def users_trello_token
    trello_credentials = current_user.credentials.find_by(service: 'trello')&.data
    trello_credentials['trello_oauth_token']
  end
end
