import React, {Component} from "react";
import Axios from "axios";
import ApiUrl from "../AppUrl/ApiUrl";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import '../styles/TgeAndClaim.css'; // Assuming you have a CSS file for styles

import mexcLogo from '../images/mexc.png';
import bitmartLogo from '../images/bitmart.png';
import grovexLogo from '../images/grovex.png';
import onclainLogo from '../images/solana.png';

const CEX_CONFIGS = {
    mexc: {
        logo: mexcLogo,
        icon: 'fas fa-exchange-alt',
        gradient: 'linear-gradient(135deg, #1B2738, #019267)'
    },
    bitmart: {
        logo: bitmartLogo,
        icon: 'fas fa-chart-bar',
        gradient: 'linear-gradient(135deg, #FF4C8B, #F8456C)'
    },
    grovex: {
        logo: grovexLogo, // Add logo URL when available
        icon: 'fas fa-globe',
        gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
    },
    onclain: {
        logo: onclainLogo,
        icon: 'fas fa-bolt',
        gradient: 'linear-gradient(135deg, #9945FF, #14F195)'
    }
};

class TgeAndClaim extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            followers: {
                dd_count: 0,
                tg_count: 0,
                x_count: 0
            },
            cex_stats: {}  // Changed to empty object to handle dynamic stats
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const token = localStorage.getItem("admintoken");
        const params = { token: token };

        Axios.get(ApiUrl.baseurl + "followers", { params })
            .then(res => {
                this.setState({
                    followers: res.data.followers,
                    cex_stats: res.data.cex_stats,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render() {
        const { loading, followers, cex_stats } = this.state;

        if (loading) {
            return (
                <Menu title="Statistics">
                    <Loading />
                </Menu>
            );
        }

        return (
            <Menu title="Statistics">
                <div className="statistics-container">
                    {/* Followers Stats */}
                    <section className="stats-section">
                        <h4 className="section-title">Platform Statistics</h4>
                        <div className="stats-grid">
                            <div className="modern-card discord-card">
                                <div className="card-icon">
                                    <i className="fab fa-discord"></i>
                                </div>
                                <div className="card-content">
                                    <div className="stat-value">{followers.dd_count}</div>
                                    <div className="stat-label">Discord Members</div>
                                </div>
                            </div>

                            <div className="modern-card telegram-card">
                                <div className="card-icon">
                                    <i className="fab fa-telegram-plane"></i>
                                </div>
                                <div className="card-content">
                                    <div className="stat-value">{followers.tg_count}</div>
                                    <div className="stat-label">Telegram Followers</div>
                                </div>
                            </div>

                            <div className="modern-card twitter-card">
                                <div className="card-icon">
                                    <i className="fab fa-twitter"></i>
                                </div>
                                <div className="card-content">
                                    <div className="stat-value">{followers.x_count}</div>
                                    <div className="stat-label">X Followers</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Chain Stats */}
                    <section className="stats-section">
                        <h4 className="section-title">Chain Statistics</h4>
                        <div className="stats-grid">
                            {Object.entries(cex_stats).map(([key, value]) => {
                                const config = CEX_CONFIGS[key] || {
                                    logo: null,
                                    icon: 'fas fa-chart-line',
                                    gradient: 'linear-gradient(135deg, #64748b, #475569)'
                                };
                                
                                return (
                                    <div key={key} className={`modern-card chain-card ${key}-card`}>
                                        <div className="card-icon" style={{ background: config.gradient }}>
                                            {config.logo ? (
                                                <img 
                                                    src={config.logo} 
                                                    alt={`${key} logo`} 
                                                    className="cex-logo"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = 'none';
                                                        e.target.parentNode.innerHTML = `<i class="${config.icon}"></i>`;
                                                    }}
                                                    style={{
                                                        opacity: 0.9,
                                                        transition: 'opacity 0.3s ease'
                                                    }}
                                                    onLoad={(e) => {
                                                        e.target.style.opacity = 1;
                                                    }}
                                                />
                                            ) : (
                                                <i className={config.icon}></i>
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <div className="stat-value">{value}</div>
                                            <div className="stat-label">
                                                {key.charAt(0).toUpperCase() + key.slice(1)} Total
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </Menu>
        );
    }
}

export default TgeAndClaim;