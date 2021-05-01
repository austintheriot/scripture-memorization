import React, { useEffect, useRef } from 'react';
import styles from './Menu.module.scss';

import { Link } from 'react-router-dom';

import chiRho from '../../images/chirho-light.svg';

//Menu State
import { useDispatch } from 'react-redux';
import { navLinkClicked } from '../../store/appSlice';
import { ExternalLink } from '../Links/ExternalLink';
import { useAppSelector } from 'store/store';
import useIsKeyboardUser from 'hooks/useIsKeyboardUser';
import { InternalLink } from 'components/Links/InternalLink';
import FocusRing from 'components/FocusRing/FocusRing';

export const Menu = () => {
	const dispatch = useDispatch();
	const { menuIsOpen } = useAppSelector((state) => state.app);
	const firstElementRef = useRef<HTMLElement | null>(null);
	const previousRef = useRef<Element | null>(null);
	const isKeyboardUser = useIsKeyboardUser();

	const closeMenu = () => {
		dispatch(navLinkClicked());
	};

	useEffect(() => {
		if (isKeyboardUser) {
			if (menuIsOpen) {
				previousRef.current = document.activeElement;
				firstElementRef.current?.focus();
			} else {
				(previousRef.current as HTMLElement)?.focus();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [menuIsOpen]);

	const tabbable = menuIsOpen ? 0 : -1;

	return (
		<nav
			tabIndex={-1}
			data-testid="menu"
			className={[styles.nav, menuIsOpen ? styles.menuOpen : ''].join(' ')}
		>
			<ExternalLink
				to="https://memorizescripture.org"
				tabIndex={tabbable}
				focus="ring"
				className={styles.chiRhoLink}
			>
				<img
					src={chiRho}
					alt="Memorize Scripture Logo: Chi Rho"
					className="ChiRho"
				/>
			</ExternalLink>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<InternalLink
						to="/"
						tabIndex={tabbable}
						className={styles.link}
						onClick={closeMenu}
						data-testid="learn"
					>
						Learn
					</InternalLink>
				</li>
				<li className={styles.li}>
					<InternalLink
						to="/review"
						tabIndex={tabbable}
						className={styles.link}
						onClick={closeMenu}
						data-testid="review"
					>
						Review
					</InternalLink>
				</li>
				<li className={styles.li}>
					<InternalLink
						to="/tools"
						tabIndex={tabbable}
						className={styles.link}
						onClick={closeMenu}
						data-testid="tools"
					>
						Tools
					</InternalLink>
				</li>
				<li className={styles.li}>
					<InternalLink
						to="/about"
						tabIndex={tabbable}
						className={styles.link}
						onClick={closeMenu}
						data-testid="about"
					>
						About
					</InternalLink>
				</li>
				<li className={styles.li}>
					<InternalLink
						tabIndex={tabbable}
						to="/contact"
						className={styles.link}
						onClick={closeMenu}
						data-testid="contact"
					>
						Contact
					</InternalLink>
				</li>
			</ul>
		</nav>
	);
};
