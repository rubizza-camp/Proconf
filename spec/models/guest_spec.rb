require 'rails_helper'

RSpec.describe Guest, type: :model do
  GUEST_VALID_PARAMS = { name: 'Name', surname: 'Surname' }.freeze
  GUEST_INVALID_PARAMS_NO_NAME = { surname: 'Surname' }.freeze
  GUEST_INVALID_PARAMS_NO_SURNAME = { name: 'Name' }.freeze

  context 'with valid params' do
    let(:valid_guest) { described_class.new(GUEST_VALID_PARAMS) }

    it { expect(valid_guest).to be_valid }
  end

  context 'with invalid params' do
    let(:guest_without_name) { described_class.new(GUEST_INVALID_PARAMS_NO_NAME) }
    let(:guest_without_surname) { described_class.new(GUEST_INVALID_PARAMS_NO_SURNAME) }

    it { expect(guest_without_name).to be_invalid }

    it { expect(guest_without_surname).to be_invalid }
  end
end
