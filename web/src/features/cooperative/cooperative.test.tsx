import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';

import { votingColleges } from '@/content/cooperative';

import { CollegesExplorer } from './CollegesExplorer';
import { VoteSimulator } from './VoteSimulator';

describe('CollegesExplorer', () => {
  it('shows the first college and switches on selection', async () => {
    const user = userEvent.setup();
    render(() => <CollegesExplorer colleges={votingColleges} />);

    expect(screen.getByRole('heading', { name: /Salariés \/ Producteurs — 40 %/ })).toBeVisible();
    await user.click(screen.getByRole('tab', { name: 'Fournisseurs' }));

    expect(screen.getByRole('heading', { name: /Fournisseurs — 12 % des voix/ })).toBeVisible();
    expect(screen.getByText(votingColleges[1]?.description ?? '')).toBeVisible();
  });

  it('describes the weights to assistive technology', () => {
    render(() => <CollegesExplorer colleges={votingColleges} />);
    expect(
      screen.getByRole('img', { name: /Poids des cinq collèges de vote.*40 %/ }),
    ).toBeInTheDocument();
  });
});

describe('VoteSimulator', () => {
  it('starts with no result and no majority', () => {
    render(() => <VoteSimulator colleges={votingColleges} />);
    expect(screen.getByText(/Majorité simple.*non atteinte/)).toBeInTheDocument();
    expect(screen.getByText(/Collèges ayant voté : 0/)).toBeInTheDocument();
  });

  it('weights a single college unanimously in favour as a full majority', async () => {
    const user = userEvent.setup();
    render(() => <VoteSimulator colleges={votingColleges} />);

    await user.type(screen.getByRole('spinbutton', { name: 'Pour — Fournisseurs' }), '3');

    expect(screen.getByText(/Pour : 100 %/)).toBeInTheDocument();
    expect(screen.getByText(/Majorité des 2\/3.*atteinte/)).toBeInTheDocument();
    expect(screen.getByText(/en dessous de 3 collèges/)).toBeInTheDocument();
  });

  it('weights colleges against their size, not their head count', async () => {
    const user = userEvent.setup();
    render(() => <VoteSimulator colleges={votingColleges} />);

    await user.type(screen.getByRole('spinbutton', { name: 'Pour — Salariés / Producteurs' }), '1');
    await user.type(screen.getByRole('spinbutton', { name: 'Contre — Bénéficiaires' }), '50');

    expect(screen.getByText(/Pour : 58[.,]8 %/)).toBeInTheDocument();
  });
});
