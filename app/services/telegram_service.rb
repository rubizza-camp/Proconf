class TelegramService
  attr_reader :user, :params, :message, :error
  TELEGRAM_API_URL = 'https://api.telegram.org/bot'.freeze
  SEND_MESSAGE_PATH = '/sendMessage?chat_id='.freeze
  MESSAGE_PATH = '&text='.freeze
  MESSAGE = "I'm trying to check telegram integration :D".freeze

  # rubocop:disable all
  class << self
    def send_announcement(user, announcement)
      @message = prepare_message(announcement)
      params = user.credentials.find_by(service: 'telegram')&.data
      if announcement.image
        url = "#{TELEGRAM_API_URL}#{params['telegram_token']}#{SEND_PHOTO_PATH}#{params['telegram_chat_id']}#{PHOTO_PATH}#{announcement.image}"
        JSON.parse(Net::HTTP.get(URI.parse(url)))
      end
      url = "#{TELEGRAM_API_URL}#{params['telegram_token']}#{SEND_MESSAGE_PATH}#{params['telegram_chat_id']}#{MESSAGE_PATH}#{@message}"
      JSON.parse(Net::HTTP.get(URI.parse(URI.encode(url))))
    end

    private

    def prepare_message(announcement)
      "Date: #{announcement.date.strftime('%d.%m.%Y %H:%M')}. Title: #{announcement.title} #{announcement.video}"
    end
  end
  # rubocop:enable all

  def initialize(user, params)
    @user = user
    @params = params
    @message = MESSAGE
    @error = ''
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

  def send_notification(announcement)
    @message = announcement.title
    telegram_valid?
  end

  private

  def telegram_valid?
    @error = "Can't write in this chat" unless telegram_send_valid?
    @error = 'Invalid token' unless telegram_token_valid?
    @error.empty?
  end

  def telegram_send_valid?
    puts create_link_for_send_message
    JSON.parse(Net::HTTP.get(URI.parse(create_link_for_send_message)))['ok']
  end

  def telegram_token_valid?
    puts "#{TELEGRAM_API_URL}#{params[:telegram_token]}/getMe"
    JSON.parse(Net::HTTP.get(URI.parse("#{TELEGRAM_API_URL}#{params[:telegram_token]}/getMe")))['ok']
  end

  def create_link_for_send_message
    "#{TELEGRAM_API_URL}#{params[:telegram_token]}#{SEND_MESSAGE_PATH}" \
      "#{params[:telegram_chat_id]}#{MESSAGE_PATH}#{message}"
  end
end
