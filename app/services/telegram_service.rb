class TelegramService
  TELEGRAM_API_URL = 'https://api.telegram.org/bot'.freeze
  SEND_MESSAGE_PATH = '/sendMessage?chat_id='.freeze
  MESSAGE_PATH = '&parse_mode=Markdown&text=auth'.freeze

  def initialize(params, user)
    @user = user
    @params = params
  end

  def execute
    if telegram_valid?
      Credential
        .find_or_create_by(user: @user, service: 'telegram')
        .update(data: { telegram_chat_id: @params[:telegram_chat_id], telegram_token: @params[:telegram_token] })
      true
    else
      false
    end
  end

  private

  def telegram_valid?
    telegram_token_valid? && telegram_chat_id_valid?
  end

  def telegram_token_valid?
    JSON.parse(Net::HTTP.get(URI.parse("#{TELEGRAM_API_URL}#{@params[:telegram_token]}/getMe")))['ok']
  end

  def telegram_chat_id_valid?
    JSON.parse(Net::HTTP.get(URI.parse(create_chat_id_link)))['ok']
  end

  def create_chat_id_link
    "#{TELEGRAM_API_URL}#{@params[:telegram_token]}#{SEND_MESSAGE_PATH}#{@params[:telegram_chat_id]}#{MESSAGE_PATH}"
  end
end
