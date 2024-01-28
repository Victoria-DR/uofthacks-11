#[generate_trait]
impl ERC721HelperImpl of ERC721HelperTrait {
   ////////////////////////////////
   // internal function to check if a token exists
   ////////////////////////////////
   fn _exists(self: @ContractState, token_id: u256) -> bool {
      // check that owner of token is not zero
      self.owner_of(token_id).is_non_zero()
   }

   ////////////////////////////////
   // _is_approved_or_owner checks if an address is an approved spender or owner
   ////////////////////////////////
   fn _is_approved_or_owner(self: @ContractState, spender: ContractAddress, token_id: u256) -> bool {
       let owner = self.owners.read(token_id);
       spender == owner
          || self.is_approved_for_all(owner, spender) 
          || self.get_approved(token_id) == spender
    }

   ////////////////////////////////
   // internal function that sets the token uri
   ////////////////////////////////
   fn _set_token_uri(ref self: ContractState, token_id: u256, token_uri: felt252) {
        assert(self._exists(token_id), 'ERC721: invalid token ID');
        self.token_uri.write(token_id, token_uri)
   }

   ////////////////////////////////
   // internal function that performs the transfer logic
   ////////////////////////////////
   fn _transfer(ref self: ContractState, from: ContractAddress, to: ContractAddress, token_id: u256) {
       // check that from address is equal to owner of token
       assert(from == self.owner_of(token_id), 'ERC721: Caller is not owner');
       // check that to address is not zero
       assert(to.is_non_zero(), 'ERC721: transfer to 0 address');

       // remove previously made approvals
       self.token_approvals.write(token_id, Zeroable::zero());

       // increase balance of to address, decrease balance of from address
       self.balances.write(from, self.balances.read(from) - 1.into());
       self.balances.write(to, self.balances.read(to) + 1.into());

       // update token_id owner
       self.owners.write(token_id, to);

       // emit the Transfer event
       self.emit(
           Transfer{ from: from, to: to, token_id: token_id }
       );
    }

    ////////////////////////////////
    // _mint function mints a new token to the to address
    ////////////////////////////////
    fn _mint(ref self: ContractState, to: ContractAddress, token_id: u256) {
        assert(to.is_non_zero(), 'TO_IS_ZERO_ADDRESS');

        // Ensures token_id is unique
        assert(!self.owner_of(token_id).is_non_zero(), 'ERC721: Token already minted');

        // Increase receiver balance
        let receiver_balance = self.balances.read(to);
        self.balances.write(to, receiver_balance + 1.into());

        // Update token_id owner
        self.owners.write(token_id, to);

        // emit Transfer event
        self.emit(
            Transfer{ from: Zeroable::zero(), to: to, token_id: token_id }
        );
     }

     ////////////////////////////////
     // _burn function burns token from owner's account
     ////////////////////////////////
     fn _burn(ref self: ContractState, token_id: u256) {
        let owner = self.owner_of(token_id);

        // Clear approvals
        self.token_approvals.write(token_id, Zeroable::zero());

        // Decrease owner balance
        let owner_balance = self.balances.read(owner);
        self.balances.write(owner, owner_balance - 1.into());

        // Delete owner
        self.owners.write(token_id, Zeroable::zero());
        // emit the Transfer event
        self.emit(
            Transfer{ from: owner, to: Zeroable::zero(), token_id: token_id }
        );
     }
   }