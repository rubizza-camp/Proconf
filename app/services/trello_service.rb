class TrelloService
  attr_reader :id, :token
  def initialize(id, token)
    @id = id
    @token = token
  end

  def user_boards
    responce.map do |board|
      {
        label: board['name'],
        value: board['id'],
        children: board_list(board['id'])
      }
    end
  end

  private

  def board_list(board_id)
    lists(board_id).map do |list|
      {
        label: list['name'],
        value: list['id']
      }
    end
  end

  def responce
    @responce ||= HTTParty.get(url_boards)
  end

  def url_boards
    "https://api.trello.com/1/members/#{id}"\
    "/boards?key=#{ENV['PROCONF_APIKEY']}"\
    "&token=#{token}"
  end

  def url_lists(board_id)
    "https://api.trello.com/1/boards/#{board_id}"\
    '/lists?cards=none&card_fields=all&filter=open&fields=all&'\
    "key=#{ENV['PROCONF_APIKEY']}&token=#{token}"
  end

  def lists(board_id)
    HTTParty.get(url_lists(board_id))
  end
end
