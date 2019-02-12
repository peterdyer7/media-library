import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Header,
  Dimmer,
  Loader,
  Grid,
  Divider
} from 'semantic-ui-react';

import SettingsList from './SettingsList/SettingsList';

export default function AdminSettings({
  loading,
  error,
  settings,
  boundSettingsFetch,
  boundSettingAdd,
  boundSettingRemove
}) {
  useEffect(() => {
    if (Object.keys(settings).length === 0) {
      boundSettingsFetch('imageMetadata');
    }
  }, []);

  if (error) {
    return <>Error! {error}</>;
  }

  if (loading) {
    return (
      <>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      </>
    );
  }
  return (
    <>
      <Segment>
        <Header size="medium" textAlign="center">
          Image Metadata Settings
        </Header>
        <Divider />
        <Grid stackable columns={3}>
          <Grid.Column>
            <SettingsList
              settingLabel="Categories"
              type="imageMetadata"
              setting="primaryCategory"
              settings={settings.primaryCategory}
              allowDelete={false}
              allowAdd={false}
              addSetting={boundSettingAdd}
              removeSetting={boundSettingRemove}
            />
          </Grid.Column>
          <Grid.Column>
            <SettingsList
              settingLabel="Alternate Categories"
              type="imageMetadata"
              setting="secondaryCategory"
              settings={settings.secondaryCategory}
              allowDelete={false}
              allowAdd={true}
              addSetting={boundSettingAdd}
              removeSetting={boundSettingRemove}
            />
          </Grid.Column>
          <Grid.Column>
            <SettingsList
              settingLabel="Tags"
              type="imageMetadata"
              setting="tags"
              settings={settings.tags}
              allowDelete={true}
              allowAdd={true}
              addSetting={boundSettingAdd}
              removeSetting={boundSettingRemove}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}

AdminSettings.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  boundSettingsFetch: PropTypes.func.isRequired,
  boundSettingAdd: PropTypes.func.isRequired,
  boundSettingRemove: PropTypes.func.isRequired
};
