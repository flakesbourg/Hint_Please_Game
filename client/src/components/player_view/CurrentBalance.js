import React from "react";
import PropTypes from "prop-types";

/**
 * Component that shows the balance of the player.
 * 
 * @component
 * @param {Object} props
 * @param {number} props.balance Current balance of the player.
 * @returns {JSX.Element} The rendered component.
 */
function CurrentBalance({balance}) {
    return (
        <div className="currentBalanceContainer">
            <h3>Balance: </h3>
            <div>
                <h3 className="currentBalance">{balance}</h3>
            </div>
        </div>
    );
}

CurrentBalance.propTypes = {
    balance: PropTypes.number.isRequired,
};

export default CurrentBalance;