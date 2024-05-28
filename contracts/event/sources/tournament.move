// Tournament Contract
module Tournament {

    use sui::table::{Self, Table};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{ Self, Supply, Balance };
    use sui::object::{Self, UID, ID };
    use sui::transfer; 
    use sui::event;
    use sui::sui::SUI;
    use sui::vector;
    use sui::account::{Self, Account};

    // Struct representing a team
    struct Team {
        teamId: u64,
        participant: address,
    }

    // Struct representing the Tournament
    struct Tournament {
        organizer: address,
        teams: vector<Team>,
        prize: u64,
        winnerAnnounced: bool,
    }

    // // Storage for the Tournament contract
    // resource TournamentStorage {
    //     tournament: Tournament
    // }

    // Initialize the Tournament contract
    public fun initialize(organizer: address, prize: u64): TournamentStorage {
        let teams: vector<Team> = vector::empty();
        let tournament: Tournament = Tournament {
            organizer: organizer,
            teams: teams,
            prize: prize,
            winnerAnnounced: false,
        };
        TournamentStorage { tournament: tournament }
    }

    // Function to add a team to the tournament
    public fun addTeam(teamParticipant: address): u64 {
        let mut storage = &mut TournamentStorage::borrow_global();
        assert(!storage.tournament.winnerAnnounced, 0);

        let teamId = vector::length(&storage.tournament.teams) as u64;
        let team = Team { teamId: teamId, participant: teamParticipant };
        vector::push_back(&mut storage.tournament.teams, team);

        teamId
    }

    // Function to announce the winner and distribute the prize
    public fun announceWinner(winningTeamId: u64) {
        let mut storage = &mut TournamentStorage::borrow_global();
        assert(!storage.tournament.winnerAnnounced, 1);
        assert(winningTeamId < vector::length(&storage.tournament.teams) as u64, 2);

        let winningTeam = vector::borrow(&storage.tournament.teams, winningTeamId as usize);
        assert(winningTeam.participant == Account::get_signer(), 3);

        // Transfer the prize to the winning team
        Account::pay_from_sender(winningTeam.participant, storage.tournament.prize);

        // Emit WinnerAnnounced event
        event::emit<WinnerAnnounced>(winningTeam.participant, storage.tournament.prize);
         // Event emitted when the winning team is announced

        storage.tournament.winnerAnnounced = true;
    }
}
