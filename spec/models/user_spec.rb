require 'rails_helper'

RSpec.describe User, type: :model do
  Role.new(name: 'admin').save

  context 'with valid params' do
    let(:valid_user) { described_class.new(email: 'admin@gmail.com', role: Role.first, password: '111111') }

    it { expect(valid_user).to be_valid }
  end

  context 'with invalid params' do
    let(:user_withoul_role_id) { described_class.new(email: 'admin@gmail.com', password: '111111') }
    let(:user_withoul_email) { described_class.new(role: Role.first, password: '111111') }
    let(:user_withoul_pass) { described_class.new(email: 'admin@gmail.com', role: Role.first) }

    it { expect(user_withoul_role_id).to be_invalid }

    it { expect(user_withoul_email).to be_invalid }

    it { expect(user_withoul_pass).to be_invalid }
  end
end
