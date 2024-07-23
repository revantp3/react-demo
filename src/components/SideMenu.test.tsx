import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the extended matchers
import SideMenu from './SideMenu'; // Adjust the import path if necessary

describe('SideMenu Component', () => {
  test('renders correctly with all elements', () => {
    render(<SideMenu />);

    // Check if profile text is rendered
    expect(screen.getByText('J')).toBeInTheDocument();

    // Check if navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Ideas')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();

    // Check if the avatar image is rendered
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', expect.stringContaining('avatar.jpg'));

    // Check if the side menu toggle label is rendered
    expect(screen.getByText(/close/i)).toBeInTheDocument(); // Adjusted query
  });

  test('renders profile text correctly', () => {
    render(<SideMenu />);
    const profileText = screen.getByText('J');
    expect(profileText).toBeInTheDocument();
    expect(profileText).toHaveClass('profile-text');
  });

  test('renders navigation links correctly with icons', () => {
    render(<SideMenu />);
    
    // Check that all navigation links contain correct icons and text
    expect(screen.getByText('Home')).toHaveClass('nav-text');
    expect(screen.getByText('Analytics')).toHaveClass('nav-text');
    expect(screen.getByText('Ideas')).toHaveClass('nav-text');
    expect(screen.getByText('Users')).toHaveClass('nav-text');
    expect(screen.getByText('Docs')).toHaveClass('nav-text');
    expect(screen.getByText('Calendar')).toHaveClass('nav-text');
    
    // Check for icon presence (assuming they are span elements with classes)
    expect(screen.getByText('Home').previousElementSibling).toHaveClass('bi-house');
    expect(screen.getByText('Analytics').previousElementSibling).toHaveClass('bi-graph-up');
    expect(screen.getByText('Ideas').previousElementSibling).toHaveClass('bi-lightbulb');
    expect(screen.getByText('Users').previousElementSibling).toHaveClass('bi-people');
    expect(screen.getByText('Docs').previousElementSibling).toHaveClass('bi-file-earmark-text');
    expect(screen.getByText('Calendar').previousElementSibling).toHaveClass('bi-calendar');
  });

  test('renders avatar image correctly', () => {
    render(<SideMenu />);
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', expect.stringContaining('avatar.jpg'));
    expect(avatarImage).toHaveClass('rounded-circle'); // Check Bootstrap class
  });

  test('renders side menu toggle correctly', () => {
    render(<SideMenu />);
    expect(screen.getByText(/close/i)).toBeInTheDocument(); // Adjusted query
  });
});
