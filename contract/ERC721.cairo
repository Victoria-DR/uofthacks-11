use starknet::ContractAddress;

#[starknet::interface]
trait INFTContract<TContractState> {
fn get_nft(self: @TContractState,token_id: u128) -> NFTContract::NFT;
fn mint(ref self: TContractState, to: ContractAddress,token_id:u128, token_uri: felt252) -> felt252;
fn transfer(ref self: TContractState,to: ContractAddress,token_id:u128) -> u128;
}


#[starknet::contract]
mod NFTContract {
 

use core::serde::Serde;
use starknet::ContractAddress;
use starknet::get_caller_address;

#[storage]
struct Storage {
// Counter variable
owners: LegacyMap<u128, ContractAddress>,
token_uri: LegacyMap<u128, felt252>,

}

#[derive(Drop, Serde)]
pub struct NFT{
owner: ContractAddress,
token_id: u128,
token_uri: felt252,
}
 


#[constructor]
fn constructor(ref self: ContractState, to: ContractAddress,token_id:u128, token_uri: felt252) {

self.owners.write(token_id, to);
self.token_uri.write(token_id,token_uri);

}

#[abi(embed_v0)]
impl NFTContract of super::INFTContract<ContractState> {
 

fn get_nft(self: @ContractState, token_id: u128) -> NFT{
 

let nft_owner = self.owners.read(token_id);
let contract_caller = get_caller_address();
assert(nft_owner != contract_caller, 'NFT Doesnt exists');

NFT{owner: nft_owner,token_id: token_id,token_uri:self.token_uri.read(token_id)}

}
 


fn mint(ref self: ContractState, to: ContractAddress,token_id:u128, token_uri: felt252) -> felt252 {

let nft_owner = self.owners.read(token_id);
let contract_caller = get_caller_address();
 

assert(nft_owner != contract_caller, 'NFT Doesnt exists');

self.owners.write(token_id,to);
self.token_uri.write(token_id, token_uri);

return self.token_uri.read(token_id);
}

fn transfer(ref self: ContractState,to: ContractAddress,token_id:u128) -> u128{

let nft_owner = self.owners.read(token_id);
let contract_caller = get_caller_address();
 

assert(nft_owner != contract_caller, 'NFT Doesnt exists');
 

self.owners.write(token_id, to);

return token_id;

}

}
}
