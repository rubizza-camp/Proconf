require 'rails_helper'

RSpec.describe Author, type: :model do
  AUTHOR_VALID_PARAMS = { name: 'Name', surname: 'Surname' }.freeze
  AUTHOR_INVALID_PARAMS_NO_NAME = { surname: 'Surname' }.freeze
  AUTHOR_INVALID_PARAMS_NO_SURNAME = { name: 'Name' }.freeze

  context 'with valid params' do
    let(:valid_author) { described_class.new(AUTHOR_VALID_PARAMS) }

    it { expect(valid_author).to be_valid }
  end

  context 'with invalid params' do
    let(:author_without_name) { described_class.new(AUTHOR_INVALID_PARAMS_NO_NAME) }
    let(:author_without_surname) { described_class.new(AUTHOR_INVALID_PARAMS_NO_SURNAME) }

    it { expect(author_without_name).to be_invalid }

    it { expect(author_without_surname).to be_invalid }
  end
end
