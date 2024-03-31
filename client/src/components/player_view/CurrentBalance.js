import React from "react";

export function CurrentBalance({balance}) {
    return (
        <div className="currentBalanceContainer">
            <h3>Balance: </h3>
            <div>
                <h3 className="currentBalance">{balance}</h3>
            </div>
        </div>
    )
}