class ParticipantsService
  class << self
    def execute(params, episode)
      @params = params
      @episode = episode
      authors if params[:authors]
      guests if params[:guests]
      sponsors if params[:sponsors]
    end

    private

    def authors
      @episode.authors.each(&:destroy) if @episode.authors.count.positive?

      @params[:authors].each do |id|
        @episode.authors.create(
          name: Author.find(id).name,
          surname: Author.find(id).surname
        )
      end
    end

    def guests
      @episode.guests.each(&:destroy) if @episode.guests.count.positive?

      @params[:guests].each do |id|
        @episode.guests.create(
          name: Guest.find(id).name,
          surname: Guest.find(id).surname
        )
      end
    end

    def sponsors
      @episode.sponsors.each(&:destroy) if @episode.sponsors.count.positive?

      @params[:sponsors].each do |id|
        @episode.sponsors.create(
          name: Sponsor.find(id).name
        )
      end
    end
  end
end
