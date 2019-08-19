class TelegramService
  attr_reader :user, :params, :message
  TELEGRAM_API_URL = 'https://api.telegram.org/bot'.freeze
  SEND_MESSAGE_PATH = '/sendMessage?chat_id='.freeze
  MESSAGE_PATH = '&parse_mode=Markdown&text='.freeze

  def initialize(user, params)
    @user = user
    @params = params
    @message = 'auth'
  end

  def execute
    if telegram_valid?
      Credential
        .find_or_create_by(user: user, service: 'telegram')
        .update(data: { telegram_chat_id: params[:telegram_chat_id], telegram_token: params[:telegram_token] })
    else
      false
    end
  end

  def send_notification(announsment)
    @message = announsment.title
    telegram_valid?
  end

  private

  def telegram_valid?
    telegram_token_valid? && telegram_send_valid?
  end

  def telegram_send_valid?
    JSON.parse(Net::HTTP.get(URI.parse(create_link_for_send_message)))['ok']
  end

  def telegram_token_valid?
    JSON.parse(Net::HTTP.get(URI.parse("#{TELEGRAM_API_URL}#{params[:telegram_token]}/getMe")))['ok']
  end

  def create_link_for_send_message
    "#{TELEGRAM_API_URL}#{params[:telegram_token]}#{SEND_MESSAGE_PATH}" \
      "#{params[:telegram_chat_id]}#{MESSAGE_PATH}#{message}"
  end
end
