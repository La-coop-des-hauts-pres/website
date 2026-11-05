import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';

import { Accordion } from './Accordion';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { TextField } from './TextField';

describe('Button', () => {
  it('is a native button of type button by default', () => {
    render(() => <Button>Envoyer</Button>);
    expect(screen.getByRole('button', { name: 'Envoyer' })).toHaveAttribute('type', 'button');
  });

  it('submits a form when its type is submit', () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    render(() => (
      <form onSubmit={onSubmit}>
        <Button type="submit">Envoyer</Button>
      </form>
    ));
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('keeps a given class beside its own', () => {
    render(() => <Button class="extra">Ok</Button>);
    expect(screen.getByRole('button', { name: 'Ok' })).toHaveClass('extra');
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(() => (
      <Button disabled onClick={onClick}>
        Ok
      </Button>
    ));
    fireEvent.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('TextField', () => {
  it('names its input by its label', () => {
    render(() => <TextField label="Courriel" name="email" />);
    expect(screen.getByRole('textbox', { name: /Courriel/ })).toBeInTheDocument();
  });

  it('flags the input invalid and exposes the error text', () => {
    render(() => <TextField label="Courriel" errorText="Adresse invalide" />);
    expect(screen.getByRole('textbox', { name: /Courriel/ })).toBeInvalid();
    expect(screen.getByText('Adresse invalide')).toBeInTheDocument();
  });
});

describe('Accordion', () => {
  it('opens a panel from its trigger', async () => {
    const user = userEvent.setup();
    render(() => (
      <Accordion entries={[{ value: 'a', title: 'Horaires', content: 'Du mardi au samedi.' }]} />
    ));
    const trigger = screen.getByRole('button', { name: /Horaires/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Dialog', () => {
  it('opens as a named dialog and closes on request', async () => {
    const user = userEvent.setup();
    render(() => <Dialog triggerLabel="Ouvrir" title="Information" closeLabel="Fermer" />);
    await user.click(screen.getByRole('button', { name: 'Ouvrir' }));
    expect(await screen.findByRole('dialog', { name: 'Information' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Fermer' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
