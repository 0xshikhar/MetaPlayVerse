module contract::nft {
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// An example NFT that can be minted by anybody
    struct KNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,

        price: u64, // Add this field to represent the price of the NFT
        // TODO: allow custom attributes

    }

    // ===== Events =====

    struct NFTMinted has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
    }

    // ===== Public view functions =====

    /// Get the NFT's `name`
    public fun name(nft: &KNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &KNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &KNFT): &Url {
        &nft.url
    }

    public fun price(nft: &KNFT): &u64 {
        &nft.price
    }

    // ===== Entrypoints =====

    /// Create a new devnet_nft
    public entry fun mint_to_sender(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        price: u64, // Add price parameter
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let nft = KNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            price: price, // Set the price
        };

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: nft.name,
        });

        transfer::transfer(nft, sender);
    }

    /// Transfer `nft` to `recipient`
    public entry fun transfer(
        nft: KNFT, recipient: address, _: &mut TxContext
    ) {
        transfer::transfer(nft, recipient)
    }

    /// Update the `description` of `nft` to `new_description`
    public entry fun update_description(
        nft: &mut KNFT,
        new_description: vector<u8>,
        _: &mut TxContext
    ) {
        nft.description = string::utf8(new_description)
    }

    /// Permanently delete `nft`
    public entry fun burn(nft: KNFT, _: &mut TxContext) {
        let KNFT { id, name: _, description: _, url: _, price: _ } = nft;
        object::delete(id)
    }

}
