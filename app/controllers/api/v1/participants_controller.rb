module Api
  module V1
    class ParticipantsController < ApiController
      def receive_all_participants
        @res = {}
        @res[:authors] = Author.all
        @res[:guests] = Guest.all
        @res[:sponsors] = Sponsor.all

        render json: @res
      end
    end
  end
end
