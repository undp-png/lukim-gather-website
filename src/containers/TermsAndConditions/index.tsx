import React from 'react';

import Container from '@components/Container';

import classes from './styles';

const TermsAndConditions = () => (
  <Container>
    <div className={classes.container}>
      <h2 className={classes.heading}>Terms And Conditions</h2>
      <p>
        By accessing this site, certain information about the User,
        such as Internet protocol (IP) addresses, navigation through
        the Site, the software used and the time spent, along with
        other similar information, will be stored on United Nations
        servers. These will not specifically identify the User.
        The information will be used internally only for web site
        traffic analysis. If the User provides unique identifying
        information, such as name, address and other information on
        forms stored on this Site, such information will be used only
        for statistical purposes and will not be published for general
        access. The United Nations, however, assumes no responsibility
        for the security of this information.
      </p>
    </div>
  </Container>
);

export default TermsAndConditions;
