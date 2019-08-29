class ParticipantsService
  class << self
    def execute(params, episode)
      @params = params
      @episode = episode
      add_authors if params[:authors]
      add_guests if params[:guests]
      add_sponsors if params[:sponsors]
    end

    private

    def add_authors
      @params[:authors].each do |id|
        @episode.authors.create(
          name: Author.find(id).name,
          surname: Author.find(id).surname
        )
      end
    end

    def add_guests
      @params[:guests].each do |id|
        @episode.guests.create(
          name: Guest.find(id).name,
          surname: Guest.find(id).surname
        )
      end
    end

    def add_sponsors
      @params[:sponsors].each do |id|
        @episode.sponsors.create(
          name: Sponsor.find(id).name
        )
      end
    end
  end
end
