# rubocop:disable all
class ParticipantsService
  class << self
    def execute(params, episode)
      @params = params
      @episode = episode
      authors
      guests
      sponsors
    end

    private

    def authors
      @episode.authors.clear if @episode.authors.count.positive?

      if @params[:authors]
        @params[:authors].each do |id|
          @episode.authors << Author.find(id)
        end
      end
    end

    def guests
      @episode.guests.clear if @episode.guests.count.positive?

      if @params[:guests]
        @params[:guests].each do |id|
          @episode.guests << Guest.find(id)
        end
      end
    end

    def sponsors
      @episode.sponsors.clear if @episode.sponsors.count.positive?

      if @params[:sponsors]
        @params[:sponsors].each do |id|
          @episode.sponsors << Sponsor.find(id)
        end
      end
    end
  end
end
# rubocop:enable all
